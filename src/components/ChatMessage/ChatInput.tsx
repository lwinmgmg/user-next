"use client";

import { ConversationDetail } from "@/types/conversationInfo.type";
import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import sendWsMesg from "../../socket/sendMesg";
import { WsContext } from "../../store/socket";

export default function ChatInput({ conv }:{
    conv: ConversationDetail
}){
    const ws = useContext(WsContext);
    const tm = useRef<NodeJS.Timeout | null>(null)
    const [mesg, setMesg] = useState("");
    const [imgUrls, setImgUrls] = useState<string[]>([])

    const onSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    }

    const trySend = (mesgStr: string, attachments: string[])=>{
        if (mesgStr.length > 0 || attachments.length > 0){
            if (conv.active){
                sendWsMesg(JSON.stringify({
                    socket_type: "chat",
                    data: {
                        name: conv.name,
                        chat_type: "send",
                        conversation_id: conv.id,
                        conv_type: conv.conv_type,
                        img_url: conv.img_url,
                        mesg:{
                            mesg: mesgStr
                        }
                    }
                }), ws)
            }else{
                sendWsMesg(JSON.stringify({
                    socket_type: "chat",
                    data: {
                        name: conv.name,
                        chat_type: "new",
                        conversation_id: conv.id,
                        conv_type: conv.conv_type,
                        img_url: conv.img_url,
                        mesg:{
                            mesg: mesgStr
                        }
                    }
                }), ws)
            }
        }
        if (tm.current){
            clearTimeout(tm.current);
            tm.current = null;
            sendUnTyping();
        }
        setMesg("")
    }
    const sendUnTyping = ()=>{
        sendWsMesg(JSON.stringify({
            socket_type: "chat",
            data: {
                name: conv.name,
                chat_type: "untype",
                conversation_id: conv.id,
                conv_type: conv.conv_type,
                img_url: conv.img_url,
                mesg:{
                    mesg: ""
                }
            }
        }), ws)
    }

    const sendTyping = () =>{
        sendWsMesg(JSON.stringify({
            socket_type: "chat",
            data: {
                name: conv.name,
                chat_type: "type",
                conversation_id: conv.id,
                conv_type: conv.conv_type,
                img_url: conv.img_url,
                mesg:{
                    mesg: ""
                }
            }
        }), ws)
    }

    const sendOnChangeEvent = (mesgStr: string)=>{
        if (tm.current){
            if (mesgStr.length == 0){
                clearTimeout(tm.current);
                tm.current = null;
                sendUnTyping();
            }
        }else{
            if (mesgStr.length > 0){
                sendTyping()
            }
            tm.current =  setTimeout(()=>{
                sendUnTyping();
                tm.current = null;
            }, 10000)
        }
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        if (e.target.value != '\n'){
            setMesg(e.target.value);
            sendOnChangeEvent(e.target.value)
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if (!e.shiftKey && e.code === 'Enter'){
            trySend(mesg, imgUrls);
        }
    }
    return (
        <>
            <div className="w-full rounded-full flex flex-row justify-center items-center bg-slate-300">
                <textarea onKeyDown={onKeyDown} value={mesg} rows={1} onChange={onChange} placeholder="Message" className="rounded-s-full max-w-lg w-full px-5 py-2 text-lg outline-none overflow-hidden resize-none" />
                <button onClick={()=>trySend(mesg, imgUrls)} className="rounded-e-full px-5 py-2">Send</button>
            </div>
        </>
    );
}
