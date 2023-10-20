"use client"
import ChatConvBox from "@/src/components/ChatConv";
import getConversations from "@/src/fetchers-client/getConversations";
import { addConvList } from "@/src/store/conversation";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { ConversationInfo } from "@/types/conversationInfo.type";
import { useEffect } from "react";

export default function ChatPage(){
    const convs = useAppSelector(state=>state.conv.convList)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        getConversations().then(
            (data: ConversationInfo[])=>{
                data.forEach(tmp=>{
                    dispatch(addConvList(tmp))
                })
            }
        )    }, [dispatch])
    return (<>
    <main className="h-full bg-slate-500">
        <div className="flex flex-col max-w-lg bg-slate-200 py-1 scroll-auto w-full h-full m-auto">
            {
                convs.map(conv=><ChatConvBox key={conv.id} convId={conv.id}/>)
            }
        </div>
    </main>
    </>);
}