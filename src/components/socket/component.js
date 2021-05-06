import socketClient from "socket.io-client";
/**/
const socket = socketClient(`${window.location.origin}/`).disconnect();

export function getSocketID() {
    return socket.id;
}

export default socket;