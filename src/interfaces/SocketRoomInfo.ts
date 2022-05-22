export interface SocketUserSimple {
    userID: string;
    socketID?: string;
}


export interface SocketRoomInfo {
    owner?: SocketUserSimple,
    players?: Record<string, string> // userID is key, socketID is the property    
}