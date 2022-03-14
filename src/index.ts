import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { getCollection, setUpDB } from './db/Mongo';
import routes from './routes/Routes';
import userRoutes from './routes/UserRoutes';
import ownerRoutes from './routes/OwnerRoutes';
import cookieParser from 'cookie-parser';
import MessageController from './controllers/SocketsIO/MessageController';

dotenv.config();
setUpDB();

const port = process.env.PORT || 3000;


const main = async () => {
    const app = express();
    const httpServer = createServer(app);

    const io = new Server(httpServer);

    // TODO: create separate file for sockets stuff
    io.on("connection", (socket) => {
        socket.on('join-room', room => {
            socket.join(room);   
        });

        socket.on('chat message', data => {
            new MessageController(io, socket.id, data).handleMessage();
        });
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