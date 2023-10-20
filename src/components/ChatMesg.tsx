"use client"

import AuthMwClient from "@/src/components/AuthMwClient";
import clientFetcher from "@/src/fetchers-client/fetcher";
import sendWsMesg from "@/src/socket/sendMesg";
import { WsContext } from "@/src/store/socket";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { chatTypeNormalNew } from "@/src/utils/chat/chatTypeNew";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";

export default function ChatMesg({ convId }:{
    convId: number
}) {
    const ws = useContext(WsContext);
    const [mesg, setMesg] = useState("");

    const dispatch = useAppDispatch();

    const activeUids = useAppSelector(state => state.conv.activeUids)
    const activeConvId = useAppSelector(state => state.conv.activeConvId)
    const convs = useAppSelector(state => state.conv.convList)
    const uid = useAppSelector(state => state.auth.uid);
    const token = useAppSelector(state => state.auth.token);

    const mesgRedux = useAppSelector(state => state.mesg.messages);

    const timeOut: { current: NodeJS.Timeout | null } = useRef<NodeJS.Timeout>(null);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMesg(e.target.value)
        if (e.target.value.length > 0) {
            sendWsMesg(JSON.stringify({
                socket_type: "chat",
                data: {
                    cid: 10,
                    chat_type: "type",
                    mesg: {
                        mesg: e.target.value,
                    },
                }
            }), ws)
            if (timeOut.current) {
                clearTimeout(timeOut.current)
            }
            timeOut.current = setTimeout(() => {
                sendWsMesg(JSON.stringify({
                    socket_type: "chat",
                    data: {
                        cid: 10,
                        chat_type: "untype",
                        mesg: {
                            mesg: e.target.value,
                        },
                    }
                }), ws)
            }, 20000)
        } else {
            sendWsMesg(JSON.stringify({
                socket_type: "chat",
                data: {
                    cid: 10,
                    chat_type: "untype",
                    mesg: {
                        mesg: e.target.value,
                    },
                }
            }), ws)
            if (timeOut.current) {
                clearTimeout(timeOut.current)
            }
        }
    }
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        chatTypeNormalNew(uid, mesg, ws)
        setMesg("")
    }

    useEffect(()=>{
        clientFetcher(`/api/chat/conversations/${convId}`, "GET").then(
            (data: DefaultResponse)=>{
                if (data.success){
                    console.log(data)
                }
                else{
                    console.log(data);
                }
            }
        )
        console.log(convs)
    }, [dispatch])

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-full bg-slate-800">
            <AuthMwClient>
                <div className="">
                </div>
                <div className="lg:col-span-3 flex flex-col">
                    <div className=" h-20 bg-slate-100">

                    </div>
                    <div className="grow">
                        <div className="h-full flex flex-col-reverse">
                            <p>Mesg</p>
                        </div>
                    </div>
                    <form className="w-full h-20 bg-slate-500 flex flex-row justify-center items-center" onSubmit={onSubmit}>
                        <input value={mesg} onChange={onChange} placeholder="Message" className="rounded-full max-w-lg w-full px-5 py-2 text-lg" />
                    </form>
                </div>
                <div>
                </div>
            </AuthMwClient>
        </main>
    );
}