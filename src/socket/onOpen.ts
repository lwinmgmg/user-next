import sendWsMesg from "./sendMesg"

export default function onOpen(ws: WebSocket, token: string) {
    return ()=>{
        sendWsMesg(token, ws);
    }
};
