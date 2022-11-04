import { Socket } from "socket.io";
import SocketIO from "../../interfaces/SocketIO";
import { getCollection } from "../../db/Mongo";
import { Collection, Document, ObjectId, WithId } from "mongodb";
import Campaign from "../../interfaces/Campaign";
import { DateTime } from "luxon";
import MessageData from "../../interfaces/MessageData";
import JoinRoomEmit from "../../interfaces/emits/JoinRoomEmit";
import ChangeCharacterEmit from "../../interfaces/emits/ChangeCharacterEmit";
import AddCharacterEmit from "../../interfaces/emits/AddCharacterEmit";
import DeleteCharacterEmit from "../../interfaces/emits/DeleteCharacterEmit";
import ACKUserJoinEmit from "../../interfaces/emits/ACKUserJoinEmit";
import ACKOwnerJoinEmit from "../../interfaces/emits/ACKOwnerJoinEmit";
import DiceHandler from "../../services/DiceHandler";
import LangModule from "../../services/LangModule";


export default class SocketsController {
    private io: SocketIO;
    private diceHandler: DiceHandler;
    private langModule: LangModule;

    constructor(io: SocketIO) {
        this.io = io;
        this.diceHandler = new DiceHandler();
        this.langModule = new LangModule();
    }

    private async getOwnerID(gameID: string) {
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const campaignInfo = <Campaign> await campaignsCollection.findOne({ _id: new ObjectId(gameID) });
        
        return campaignInfo.owner.toString();
    }

    public async changeCharacter(_: Socket, data: ChangeCharacterEmit) {
        this.io.to(data.receiverSocketID).emit('change-character', data.character);
    }

    public async addCharacter(_: Socket, data: AddCharacterEmit) {
        this.io.to(data.ownerSocketID).emit('add-character', data.character);
    }

    public async deleteCharacter(socket: Socket, data: DeleteCharacterEmit) {
        const recipientSocketIDs = [...new Set([data.ownerSocketID, data.userSocketID, socket.id])].filter((socketID): socketID is string => !!socketID);
        this.io.to(recipientSocketIDs).emit('delete-character', data.characterID, data.isNPC);
    }

    /**
     * Starts the 'user-joined-room' process, so the owner (if they have active socket) can get user's paired ids
     * Also the users (again, if they are active) can get owner's socket id
     * Pretty much puts keeping track of sockets onto individual clients, so the server can chill
     */
    public async joinRoom(socket: Socket, data: JoinRoomEmit) {
        const ownerID = await this.getOwnerID(data.roomID);
        this.io.to(data.roomID).emit('user-joined-room', { userID: data.userID, socketID: socket.id, isOwner: data.userID === ownerID});
        socket.join(data.roomID);
    }

    public async ackUserJoin(_: Socket, data: ACKUserJoinEmit) {
        this.io.to(data.joinedUserSocketID).emit('ack-join', data.ownerSocketID);
    }

    public async ackOwnerJoin(_: Socket, data: ACKOwnerJoinEmit) {
        this.io.to(data.ownerSocketID).emit('ack-owner-join', { userID: data.userID, socketID: data.socketID });
    }

    /**
     * Checks if message starts with roll command; if it does, rolls the dice; adds timestamp to the message and sends it
     */
    public async handleMessage(senderSocket: Socket, messageData: MessageData) {
        // handle rolling with regex - might want to refactor into some kind of command handler if more commands are needed
        if (/^\/roll\040|^\/r\040/.test(messageData.messageText)) {
            Object.assign(messageData, { rollResult: this.diceHandler.rollDice(messageData.messageText)});
        }

        // fantasy "language" module, replaces the text with gibberish
        if (/^\/lang\040|^\/l\040/.test(messageData.messageText)) {
            Object.assign(messageData, {...this.langModule.composeMessage(messageData.messageText)});
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

        // send messages to gm only
        if (/^\/gm\040/.test(messageData.messageText)) {
            Object.assign(messageData, { messageText: messageData.messageText.slice(3), whisperGM: true });
            this.io.to([senderSocket.id, messageData.ownerSocketID]).emit('chat-message', messageData);
            return;
        }

        // sends message to either the whole room or only back to the sender
        this.io.to(messageData.isPublic ? messageData.gameID : senderSocket.id).emit('chat-message', messageData);
    }
    
}