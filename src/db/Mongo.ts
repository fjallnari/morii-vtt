import { Collection, Db, Document, FindCursor, FindOptions, IndexDescription, IndexInformationOptions, IndexSpecification, MongoClient, ObjectId, WithId } from "mongodb";
import UserDB from "../interfaces/UserDB";
import jwt from 'jsonwebtoken';

let _client: MongoClient;

export async function initConnection(mongoUrl: string, socketTimeoutMS: number = 360000): Promise<MongoClient> {
    return new Promise<MongoClient>((resolve, reject) => {
        _client = new MongoClient(mongoUrl, { socketTimeoutMS: socketTimeoutMS });
        _client.connect((error => {
            if (error != null) reject(error);
            resolve(_client);
        }));
    });
}

export async function getConnection() {
    return _client;
}

export async function closeConnection(): Promise<void> {
    await _client.close();
}

export async function getDb(dbName: string | undefined): Promise<Db> {
    return _client.db(dbName);
}

export async function collectionExists(collectionName: string, db: Db): Promise<boolean> {
    const targetCollections = await db.listCollections().toArray();
    const collections = targetCollections.find(collection => {
        return collection.name == collectionName;
    });

    return collections != null;
}

export async function createCollectionIfNotExists(
    collectionName: string, 
    database: Db, 
    indexSpec: IndexSpecification | null = null, 
    indexOptions: IndexDescription | {} = {}
    ): Promise<void> {
        const exists: boolean = await collectionExists(collectionName, database);
        
        if (!exists) {
            await database.createCollection(collectionName);
            if (indexSpec) await database.collection(collectionName).createIndex(indexSpec, indexOptions);
        }
}

export async function dropCollectionIfExists(collectionName: string, database: Db): Promise<void> {
    if (await collectionExists(collectionName, database)) {
        console.log(`[DB] Dropping ${collectionName} from ${printDatabase(database)}.`);
        await database.collection(collectionName).drop();
    }
}

/**
 * So, for some reason this one works, but!
 * if we were to use the insertOne function directly in the code with custom _id of a type different than the default ObjectId
 * it wouldn't even compile Typescript
 * praise the T, i guess
 */
export async function insertOne(document: Document, targetCollection: Collection){
    await targetCollection.insertOne(document);
}

export async function insertMany(documents: Document[], targetCollection: Collection): Promise<number> {
    const insertManyRes = await targetCollection.insertMany(documents);
    const inserted = insertManyRes.insertedCount;
    console.assert(inserted == documents.length);
    return inserted;
}

function printDatabase(database: Db) {
    return `${database.databaseName}`;
}

/**
 * returns an array of objects which have an id that is included in ids arg
 * @param ids 
 * @param collectionName
 * @param options - e.g. projection
 * @returns 
*/
export const getIdsFromCollection = async (ids: ObjectId[], collectionName: string, options: FindOptions | undefined = undefined) => {
    const db = await getDb(process.env.MONGO_INITDB_DATABASE);
    
    if (await collectionExists(collectionName, db)){
        const collection = db.collection(collectionName);
        return await collection.aggregate( [
            { "$match" : { "_id" : { "$in" : ids } } }, 
            { "$addFields" : { "__order" : { "$indexOfArray" : [ ids, "$_id" ] } } }, 
            { "$sort" : { "__order" : 1 } } 
        ]).toArray();
    };

    return;
}

export const getCollection = async(collectionName: string) => {
    const db = await getDb(process.env.MONGO_INITDB_DATABASE);
        
    if (await collectionExists(collectionName, db)){
        return db.collection(collectionName);
    }

    return;
}

export const getUserFromToken = async (accessToken: string) => {
    const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
    const userID = new ObjectId(decodedToken.user._id);

    const usersCollection = <Collection<Document>> await getCollection('users');

    return <WithId<UserDB>> await usersCollection.findOne({ _id: userID});
}

export const getUserObj = async (userID: ObjectId | undefined) => {
    const usersCollection = <Collection<Document>> await getCollection('users');

    return <WithId<UserDB>> await usersCollection.findOne({ _id: userID});
}

// ! TODO - Remove after one run on prod, no need for it to be repeated
export const fixMissingMonstersArrays = async() => {
    const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
    await campaignsCollection.updateMany({'monsters': {$exists : false}}, {$set: {'monsters': []}});
}

export const fixMissingSystem = async() => {
    const charactersCollection = <Collection<Document>> await getCollection('characters');
    await charactersCollection.updateMany({'system': {$exists : false}}, {$set: {'system': 'D&D 5E'}});
}

export async function setUpDB() {
    await initConnection(<string>process.env.MONGO_URL);
    const db = await getDb(process.env.MONGO_INITDB_DATABASE);
    await createCollectionIfNotExists("users", db, { "username": 1 }, {unique: true});
    await createCollectionIfNotExists("campaigns", db);
    await createCollectionIfNotExists("invites", db);
    await createCollectionIfNotExists("characters", db);
    await createCollectionIfNotExists("monsters", db);
    // await fixMissingMonstersArrays();
    fixMissingSystem()
}
