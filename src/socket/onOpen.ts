import sendWsMesg from "./sendMesg"

export default function onOpen(ws: WebSocket) {
    return ()=>{
        sendWsMesg("Hellodkfa", ws);
    }
};
