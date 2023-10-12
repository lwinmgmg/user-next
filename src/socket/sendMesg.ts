export default function sendWsMesg(mesg: string, ws?: WebSocket){
    ws?.send(mesg.length.toString());
    ws?.send(mesg);
}
