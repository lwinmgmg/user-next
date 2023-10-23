"use client"

import { useAppDispatch, useAppSelector } from "@/src/store/store";
import ChatInput from "./ChatInput";
import { getConvName } from "../../store/convGetter";
import { useEffect } from "react";
import { checkUser } from "../../store/userGetter";
import getUserByCode from "../../fetchers-client/getUser";
import { addUser } from "../../store/user";
import ChatBox from "./ChatBox";
import Link from "next/link";

export default function ChatMesg() {
    const dispatch = useAppDispatch();
    const activeConv = useAppSelector(state=>state.conv.activeConv);
    const users = useAppSelector(state=>state.user.users);
    const userId = useAppSelector(state=>state.auth.uid)

    useEffect(()=>{
        activeConv?.conv_users.forEach(convUser=>{
            if (!checkUser(users, convUser.user_id)){
                getUserByCode(convUser.user_id).then((userData)=>{
                    if (userData){
                        dispatch(addUser(userData))
                    }
                })
            }
        })
    }, [activeConv])
    return (
        <div className="flex flex-row justify-center w-full h-full max-h-full">
            <div className="flex-1 hidden">
            </div>
            <div className="w-full max-w-md h-full bg-slate-500">
                {activeConv? (<div className="flex flex-col h-full overflow-hidden">
                    <div className="h-20 bg-slate-400 flex flex-row justify-center items-center overflow-hidden">
                        <h1 className="text-lg font-bold">{getConvName(activeConv, userId, users)}</h1>
                    </div>
                    <div className="flex-grow overflow-hidden" style={{height: "25vh"}}>
                        <div className="w-full h-full max-h-full overflow-hidden">
                            <ChatBox conv={activeConv} />
                        </div>
                    </div>
                    <div className="px-5 h-20 bg-slate-400 flex flex-row justify-center items-center">
                        <ChatInput conv={activeConv} />
                    </div>
                </div>):(<div>
                    Please select a chat.<Link href="/chat">Go to list</Link>
                </div>)}
            </div>
            <div className="flex-1 hidden">

            </div>
        </div>
    );
}