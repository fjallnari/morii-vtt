import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type SocketIO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export default SocketIO;