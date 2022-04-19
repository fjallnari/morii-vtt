interface SocketUserSimple {
    userID?: string;
    socketID?: string;
}


export default interface SocketRoomInfo {
    owner?: SocketUserSimple,
    players?: SocketUserSimple[]    
}