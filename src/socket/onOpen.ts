import sendWsMesg from "./sendMesg"

export default function onOpen(ws: WebSocket, token: string) {
    console.log("Runned 1")
    return ()=>{
        console.log("Runned")
        sendWsMesg(token, ws);
    }
};
