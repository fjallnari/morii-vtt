import pino from 'pino';
import dotenv from "dotenv";

dotenv.config();

export default pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    level: process.env.PINO_LOG_LEVEL || 'info',
});