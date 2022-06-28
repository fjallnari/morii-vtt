import { Socket } from "socket.io";
import SocketIO from "../../interfaces/SocketIO";
import { SocketRoomInfo } from "../../interfaces/SocketRoomInfo";
import { getCollection } from "../../db/Mongo";
import { Collection, Document, ObjectId, WithId } from "mongodb";
import Campaign from "../../interfaces/Campaign";
import DiceHandler from "../../services/DiceHandler";
import { DateTime } from "luxon";
import MessageData from "../../interfaces/MessageData";
import JoinRoomEmitData from "../../interfaces/JoinRoomEmitData";
import ChangeCharacterEmitData from "../../interfaces/ChangeCharacterEmitData";


export default class SocketsController {
    private io: SocketIO;
    private rooms: Map<string, SocketRoomInfo>;
    private diceHandler: DiceHandler;

    constructor(io: SocketIO) {
        this.io = io;
        this.rooms = new Map<string, SocketRoomInfo>();
        this.diceHandler = new DiceHandler();
    }

    private async getOwnerID(gameID: string) {
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const campaignInfo = <Campaign> await campaignsCollection.findOne({ _id: new ObjectId(gameID) });
        
        return campaignInfo.owner.toString();
    }

    public async changeCharacter(socket: Socket, data: ChangeCharacterEmitData) {
        const socketRoom = this.rooms.get(data.roomID);
        const ownerSocketID = <string> socketRoom?.owner?.socketID;
        const playerSocketID = <string> socketRoom?.players?.[<string> data.character.playerID];

        // console.log(data, data.character.playerID, this.rooms, ownerSocketID, playerSocketID);
        this.io.to([playerSocketID, ownerSocketID]).emit('change-character', data.character);
    }

    public async addCharacter(socket: Socket, data: ChangeCharacterEmitData) {
        const socketRoom = this.rooms.get(data.roomID);
        const ownerSocketID = <string> socketRoom?.owner?.socketID;
        this.io.to([ownerSocketID]).emit('add-character', data.character);
    }

    public async deleteCharacter(socket: Socket, data: ChangeCharacterEmitData) {
        const socketRoom = this.rooms.get(data.roomID);
        const ownerSocketID = <string> socketRoom?.owner?.socketID;
        const playerSocketID = <string> socketRoom?.players?.[<string> data.character.playerID];

        this.io.to([playerSocketID, ownerSocketID]).emit('delete-character', data.character);
    }

    /**
     * Saves socketID + userID pair to memory; also adds the user to the socket room
     */
    public async joinRoom(socket: Socket, data: JoinRoomEmitData) {
        // if the first user joins, get & save owner's userID
        if (! this.rooms.has(data.roomID)) {
            const ownerID = await this.getOwnerID(data.roomID);
            this.rooms.set(data.roomID, { owner: { userID: ownerID }, players: {}});
        }

        const roomInfo = this.rooms.get(data.roomID);

        // fill in owner's socketID or add newly joined regular player to the record of players
        this.rooms.set(data.roomID, Object.assign(roomInfo ? roomInfo : {}, 
            data.userID === roomInfo?.owner?.userID ? { owner: { userID: data.userID, socketID: socket.id }} : 
            { players: Object.assign(roomInfo?.players ? roomInfo?.players : {}, { [data.userID] : socket.id })}
        ));

        socket.join(data.roomID);
    }

    /**
     * Checks if message starts with roll command; if it does, rolls the dice; adds timestamp to the message and sends it
     */
    public async handleMessage(senderSocket: Socket, messageData: MessageData) {
        // handle rolling with regex - might want to refactor into some kind of command handler if more commands are needed
        if (/^\/roll\040|^\/r\040/.test(messageData.messageText)) {
            Object.assign(messageData, { rollResult: this.diceHandler.rollDice(messageData.messageText)});
        }
        
        // format looks like e.g. 'Mar 14, 18:41'
        const timestamp = DateTime.now().toLocaleString({
            month: 'short', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hourCycle: 'h23'
        });

        Object.assign(messageData, { timestamp: timestamp });

        // sends message to either the whole room or only back to the sender
        this.io.to(messageData.isPublic ? messageData.gameID : senderSocket.id)
            .emit('chat-message', messageData);
    }
    
}