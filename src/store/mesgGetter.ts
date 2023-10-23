import type { MessageDetail } from "@/types/message.type"
import type { MessageDetailDict } from "./message"

const checkMesg = (mesg: MessageDetailDict, mesgId?: string): MessageDetail | undefined=>{
    if (!mesgId){
        return undefined
    }
    return mesg[mesgId]
}

const filterMesg = (mesgDict: MessageDetailDict, convId: number): MessageDetail[]=>{
    return Object.values(mesgDict).filter((mesg)=>mesg.conversation_id === convId)
}

export {
    checkMesg, filterMesg
}
