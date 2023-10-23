"use client";

import { FormEvent, useRef, useState } from "react";
import getUserByCode from "../../fetchers-client/getUser";
import AlertBox from "../AlertComponent";
import createConversation from "../../fetchers-client/createConversation";
import { useAppDispatch } from "../../store/store";
import { setActiveConv } from "../../store/conversation";
import { useRouter } from "next/navigation";

export default function ConvSearchForm(){

    const dispatch = useAppDispatch();
    const router = useRouter();
    const userIdInput = useRef<HTMLInputElement>(null);
    const [alertShow, setAlertShow] = useState(false);

    const onSubmit = (e: FormEvent)=>{
        e.preventDefault();
        if (userIdInput.current){
            const userId = userIdInput.current.value;
            getUserByCode(userId).then(user=>{
                if (user){
                    createConversation(1, [user.code]).then(
                        (conv)=>{
                            if (conv){
                                dispatch(setActiveConv(conv))
                                router.push("/chat/message")
                            }
                        }
                    )
                }else{
                    setAlertShow(true);
                }
            })
            userIdInput.current.value = "";
        }
    }

    return (
        <>
            <form onSubmit={onSubmit} className="mt-2 flex flex-row w-full text-sm shadow-sm hover:shadow-xl focus:shadow-xl active:shadow-xl rounded-full">
                <input className="py-3 px-5 flex-grow rounded-s-full focus:outline-none" ref={userIdInput} placeholder="User ID" type="text" />
                <button className="py-2 px-5 whitespace-nowrap bg-slate-300 rounded-e-full">Start Chat</button>
                <AlertBox mesg="No user found" show={alertShow} onClick={()=>setAlertShow(false)} />
            </form>
        </>
    );
}
