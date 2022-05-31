import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { getCollection, setUpDB } from './db/Mongo';
import routes from './routes/Routes';
import userRoutes from './routes/UserRoutes';
import ownerRoutes from './routes/OwnerRoutes';
import cookieParser from 'cookie-parser';
import SocketsController from "./controllers/SocketsIO/SocketsController";

dotenv.config();
setUpDB();

const port = process.env.PORT || 3000;


const main = async () => {
    const app = express();
    const httpServer = createServer(app);

    const io = new Server(httpServer);
    const socketsController = new SocketsController(io);
    
    io.on("connection", (socket) => {
        socket.on('join-room', data => {
            socketsController.joinRoom(socket, data);
        });

        socket.on('chat-message', data => {
            socketsController.handleMessage(socket, data);
        });

        socket.on('change-character', data => {
            socketsController.changeCharacter(socket, data);
        })

    });

    app.use(express.static('src/client/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use('/', routes);
    app.use('/', userRoutes);
    app.use('/', ownerRoutes);

    app.use((err: any, req: any, res:any, next:any) => {
        res.status(err.status || 500);
        res.json({ error: err });
    });

    httpServer.listen(3000, () => {
        console.log(`Server started on http://localhost:${port}/?#`);
    });
}

main();