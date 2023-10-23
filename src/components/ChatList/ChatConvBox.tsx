"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import getConversationDetails from "../../fetchers-client/getConvDetail";
import getUserByCode from "../../fetchers-client/getUser";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { checkUser } from "../../store/userGetter";
import { addUser } from "../../store/user";
import { addConv, setActiveConv } from "../../store/conversation";
import { checkConv, getConvName } from "../../store/convGetter";
import { checkMesg } from "../../store/mesgGetter";
import getMessages from "../../fetchers-client/getMessages";
import { addMessage } from "../../store/message";

export default function ChatConvBox({
    convId,
    last_mesg_id,
}: {
    convId: number,
    last_mesg_id: string,
}){
    const imgUrl = "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-2-1024x1024.jpg";
    const users = useAppSelector(state=>state.user.users);
    const convs = useAppSelector(state=>state.conv.convMap);
    const mesgs = useAppSelector(state=>state.mesg.messages);
    const userId = useAppSelector(state=>state.auth.uid)
    const conv = checkConv(convs, convId);
    const mesg = checkMesg(mesgs, conv?.last_mesg_id)
    const lastMesg = checkMesg(mesgs, conv?.last_mesg_id)
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onCLick = () => {
        if (conv){
            dispatch(setActiveConv(conv));
            router.push(`/chat/message`);
        }
    }

    useEffect(()=>{
        if (conv){
            if (conv.last_mesg_id && conv.last_mesg_id != last_mesg_id){
                const nConv = structuredClone(conv)
                nConv.last_mesg_id = last_mesg_id
                dispatch(addConv(nConv));
            }
            if (!lastMesg && conv && conv.last_mesg_id && conv.last_mesg_id.length > 0){
                console.log(conv.last_mesg_id);
            }
        }else{
            getConversationDetails(convId.toString()).then(
                data=>{
                    if (data){
                        dispatch(addConv(data))
                    }
                }
            )
        }
    }, [convId])

    useEffect(()=>{
        conv?.conv_users.forEach(convUser=>{
            if (!checkUser(users, convUser.user_id)){
                getUserByCode(convUser.user_id).then((userData)=>{
                    if (userData){
                        dispatch(addUser(userData))
                    }
                })
            }
        })
    }, [conv])

    useEffect(()=>{
        if (mesgs && conv && conv.last_mesg_id && !mesg){
            getMessages(convId.toString(), conv.last_mesg_id, 1).then(res=>{
                if (res.length > 0){
                    dispatch(addMessage(res[0]))
                }
            })
        }
    }, [mesgs, conv])

    return (
        <>

        {
        conv ? (<div onClick={onCLick} className="flex flex-row overflow-hidden items-center space-x-4 w-full h-24 rounded-md shadow-md shadow-grey-100 hover:cursor-pointer hover:shadow-lg bg-slate-300">
            <img src={imgUrl} className="rounded-full h-20, w-20" alt="Profile" />
            <div className="flex-grow">
                <div className="">
                    <p className="truncate text-lg font-bold">{getConvName(conv, userId, users)}</p>
                    <p className="truncate text-sm">{mesg?.mesg}</p>
                </div>
            </div>
        </div>) : null
        }
        </>
    );
}