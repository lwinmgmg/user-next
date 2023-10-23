export default function sendWsMesg(mesg: string, ws?: WebSocket){
    if (mesg.length > 0){
        ws?.send(mesg.length.toString());
        ws?.send(mesg);
    }
}
