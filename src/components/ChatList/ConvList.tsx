"use client";

import { useEffect, useReducer, useState } from "react";
import ChatConvBox from "./ChatConvBox";
import ConvSearchForm from "./ConvSearchForm";
import type { ConversationInfo } from "@/types/conversationInfo.type";
import getConversations from "../../fetchers-client/getConversations";
import { useAppSelector } from "../../store/store";

export default function ConvList(){
    const convList = useAppSelector(state=>state.conv.convMap)
    const [convs, dispatch] = useReducer(convReducer, [])
    const fetchData = ()=>{
        getConversations().then(
            (data: ConversationInfo[])=>{
                dispatch({
                    type: ACTION_TYPE.FETCH,
                    payload: data
                })
            }
        )
    }
    useEffect(()=>{
        fetchData();
    }, [convList])
    return (
        <>
            <ConvSearchForm />
            {
                convs.sort((v1, v2)=>v1.last_mesg_id > v2.last_mesg_id?-1:1).map(conv=><ChatConvBox key={conv.id} convId={conv.id} last_mesg_id={conv.last_mesg_id}/>)
            }
        </>
    );
}

enum ACTION_TYPE {
    FETCH = "FETCH",
    UPDATE = "UPDATE",
}

interface ConvInfoAction {
    type: ACTION_TYPE,
    payload: ConversationInfo[]
}

const convReducer = (state: ConversationInfo[], actions: ConvInfoAction): ConversationInfo[]=>{
    switch (actions.type){
        case ACTION_TYPE.FETCH:
            if (actions.payload){
                return actions.payload
            }
        case ACTION_TYPE.UPDATE:

    }
    return state
}
