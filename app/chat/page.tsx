"use client"
import sendWsMesg from "@/src/socket/sendMesg";
import { WsContext } from "@/src/store/socket";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

export default function ChatPage(){
    const ws = useContext(WsContext);
    const [mesg, setMesg] = useState("");
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setMesg(e.target.value)
        if (e.target.value.length > 0){
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
        }else{
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
        }
    }
    const onSubmit = (e: FormEvent)=>{
        e.preventDefault();
        sendWsMesg(JSON.stringify({
            socket_type: "chat",
            data: {
                cid: 10,
                chat_type: "new",
                mesg: {
                    mesg: mesg,
                },
            }
        }), ws)
        setMesg("")
    }
    return(
        <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-full bg-orange-300">
            <div className="">

            </div>
            <div className="lg:col-span-3 flex flex-col">
                <div className=" h-20 bg-slate-300">

                </div>
                <div className="grow">
                    <p>Message</p>
                </div>
                <form className="w-full h-20 bg-slate-100 flex flex-row justify-center items-center" onSubmit={onSubmit}>
                    <input value={mesg} onChange={onChange} placeholder="Message" className="px-5 py-2 ring-1 ring-slate-600 text-lg" />
                </form>
            </div>
            <div>

            </div>
        </main>
    );
}