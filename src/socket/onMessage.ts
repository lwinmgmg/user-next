"use client";

import { ChatData } from "@/types/message.type";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { addMessage } from "../store/message";
import { ConversationDetailDict, addConv } from "../store/conversation";
import { checkConv } from "../store/convGetter";
import { addTyping, removeTyping } from "../store/isTyping";
import getConversationDetails from "../fetchers-client/getConvDetail";

export default function onMessage(mesg: MessageEvent, dispatch: Dispatch<AnyAction>, convs: ConversationDetailDict){
    const data: ChatData = JSON.parse(mesg.data);
    console.log("DATA", mesg.data.chat_type, data.chat_type, data);
    switch (data.chat_type){
        case "new":
            dispatch(addMessage({
                id: data.mesg.id,
                mesg: data.mesg.mesg,
                att_url: data.mesg.att_url,
                is_edited: data.mesg.is_edited,
                user_id: data.mesg.user_id,
                conversation_id: data.conversation_id,
                status: data.mesg.status,
                updated_time: data.mesg.updated_time,
                created_time: data.mesg.created_time
            }))
            getConversationDetails(data.conversation_id.toString()).then(convData=>{
                if (convData) dispatch(addConv(convData))
            })
            break
        case "send":
            console.log("send")
            dispatch(addMessage({
                id: data.mesg.id,
                mesg: data.mesg.mesg,
                att_url: data.mesg.att_url,
                is_edited: data.mesg.is_edited,
                user_id: data.mesg.user_id,
                conversation_id: data.conversation_id,
                status: data.mesg.status,
                updated_time: data.mesg.updated_time,
                created_time: data.mesg.created_time
            }))
            const conv = checkConv(convs, data.conversation_id)
            if (conv){
                const nConv = structuredClone(conv)
                nConv.last_mesg_id = data.mesg.id
                dispatch(addConv(nConv))
            }
            break
        case "type":
            dispatch(addTyping([data.conversation_id.toString(), data.mesg.user_id]))
            break
        case "untype":
            dispatch(removeTyping([data.conversation_id.toString(), data.mesg.user_id]))
            break
    }
}

// {
//     "conversation_id": 23,
//     "conv_type": 1,
//     "last_mesg_id": "65369194189d536796470582",
//     "chat_type": "new",
//     "mesg": {
//         "id": "65369194189d536796470582",
//         "parent_id": "000000000000000000000000",
//         "mesg": "aeiou yajkdjfa",
//         "is_edited": false,
//         "status": 1,
//         "user_id": "0255s",
//         "updated_time": 1698075028,
//         "created_time": 1698075028
//     }
// }