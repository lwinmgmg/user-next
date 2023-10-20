"use client";
import type { ConversationDetail } from "@/types/conversationInfo.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getConversationDetails from "../fetchers-client/getConvDetail";

export default function ChatConvBox({
    convId,
}: {
    convId: number,
}){
    const imgUrl = "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
    const [mesg, setMesg] = useState("Message...");
    const [conv, setConv] = useState<ConversationDetail | null>(null);
    const router = useRouter()
    const onCLick = () => {
        router.push(`/chat/${convId}`);
    }
    useEffect(()=>{
        getConversationDetails(convId.toString()).then(
            data=>{
                setConv(data)
            }
        )
    }, [convId])
    return (
        <>
        <div onClick={onCLick} className="flex flex-row overflow-hidden items-center space-x-4 w-full h-24 rounded-md shadow-md shadow-grey-100 hover:cursor-pointer hover:shadow-lg">
            <img src={imgUrl} className="rounded-full h-20, w-20" alt="Profile" />
            <div className="flex-grow">
                <div className="">
                    <p className="truncate text-lg font-bold">{conv && conv.conv_type === 1 ? conv.id : conv?.id}</p>
                    <p className="truncate text-sm">{mesg}</p>
                </div>
            </div>
        </div>
        </>
    );
}