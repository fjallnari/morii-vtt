import { DateTime } from "luxon";
import MessageData from "../interfaces/MessageData";
import SocketIO from "../interfaces/SocketIO";
import DiceHandler from "../services/DiceHandler";


export default class MessageController {
    private io: SocketIO;
    private senderSocketID: string;
    private data: MessageData;

    constructor(io: SocketIO, senderSocketID: string, messageData: MessageData) {
        this.io = io;
        this.senderSocketID = senderSocketID;
        this.data = messageData;
    }

    private async rollDice(diceInput: string) {
        const diceHandler = new DiceHandler();
        return diceHandler.rollDice(diceInput);
    }

    /**
     * Checks if message starts with roll command; if it does, rolls the dice; adds timestamp to the message and sends it
     */
    public async handleMessage() {
        // handle rolling with regex - might want to refactor into some kind of command handler if more commands are needed
        if (/^\/roll\040|^\/r\040/.test(this.data.messageText)) {
            Object.assign(this.data, { rollResult: await this.rollDice(this.data.messageText)});
        }
        
        // format looks like e.g. 'Mar 14, 18:41'
        const timestamp = DateTime.now().toLocaleString({
            month: 'short', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hourCycle: 'h23'
        });

        Object.assign(this.data, { timestamp: timestamp });

        // sends message to either the whole room or only back to the sender
        this.io.to(this.data.isPublic ? this.data.gameID : this.senderSocketID)
            .emit('chat message', this.data);
    }

}