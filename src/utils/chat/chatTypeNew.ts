import sendWsMesg from "@/src/socket/sendMesg";

export function chatTypeNormalNew(uid: string, mesg: string, ws?: WebSocket){
    sendWsMesg("", ws)
}