"use client";

import { useEffect, useState } from "react";
import MesgBox from "../MesgBox";
import type { ConversationDetail } from "@/types/conversationInfo.type";
import { useAppSelector } from "../../store/store";
import getMessages from "../../fetchers-client/getMessages";
import { checkMesg, filterMesg } from "../../store/mesgGetter";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/message";
import { getTyping } from "../../store/isTypingGetter";

export default function ChatBox({ conv }:{
    conv: ConversationDetail
}){
    const dispatch = useDispatch()
    const mesgMap = useAppSelector(state=>state.mesg.messages)
    const users = useAppSelector(state=>state.user.users)
    const typings = useAppSelector(state=>state.typing.typings)
    const userId = useAppSelector(state=>state.auth.uid)
    const messages = filterMesg(mesgMap, conv.id).sort((mesg1, mesg2)=>mesg1.id > mesg2.id? -1:1)
    const [first, setFirst] = useState(true);
    const typingUserList = getTyping(typings, conv.id.toString()).filter(tmp=>tmp!=userId)

    const typingCheck = ()=>{
        return typingUserList.map((typeUser)=>{
            if (users[typeUser]){
                return users[typeUser].partner_data.first_name + " " + users[typeUser].partner_data.last_name
            }
        }).join(", ")
    }

    const loadMessage = (lastMesgId: string, limit: number)=>{
        getMessages(conv.id.toString(), lastMesgId, limit).then((mesgs=>{
            mesgs.forEach(mesg=>{
                if (!checkMesg(mesgMap, mesg.id)){
                    dispatch(addMessage(mesg))
                }
            })
        }))
    }
    useEffect(()=>{
        if (first){
            if (conv.last_mesg_id) loadMessage(conv.last_mesg_id, 10)
            setFirst(false);
        }
    }, [conv, first]);
    return (
        <>
            <div className="h-full overflow-hidden overflow-y-auto flex flex-col-reverse w-full bg-black">
                {
                    typingUserList.length > 0? <p className="text-left">{typingCheck()} {typingUserList.length == 1?'is':'are'} typing...</p>: null
                }
                {
                    messages.map((mesg)=><MesgBox key={mesg.id} isOwner={userId == mesg.user_id} mesg={mesg} />)
                }
            </div>
        </>
    );
}