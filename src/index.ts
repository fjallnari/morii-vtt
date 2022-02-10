import path from 'path';
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { getCollection, setUpDB } from './db/Mongo';
import routes from './routes/routes';
import secureRoutes from './routes/secure-routes';

dotenv.config();
setUpDB();

const port = process.env.PORT || 4000;


const main = () => {
  const app = express();
  const httpServer = createServer(app);
  
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:4000"
    }
  });
  
  io.on("connection", (socket) => {
    socket.on('chat message', msg => {
      console.log(msg);
      io.emit('chat message', msg);
    });
  });

  app.use(express.static('src/client/public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes);
  app.use('/', secureRoutes);

  app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/public', 'index.html'));
  });

  httpServer.listen(3000);

  // Handle errors.
  app.use(function(err: any, req: any, res:any, next:any) {
    res.status(err.status || 500);
    res.json({ error: err });
  });

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/?#`);
  });
}

main();