"use client";
import { useEffect, useReducer, useRef } from "react";
import { WsContext } from "../store/socket";
import { useAppDispatch, useAppSelector } from "../store/store";
import { default as onMesgHelper } from "../socket/onMessage"
import Cookies from "universal-cookie";
import sendWsMesg from "../socket/sendMesg";
import { getChatWsUrl } from "../utils/publicEnv";

export default function WsInitMw({ children }: {
    children: React.ReactNode
}){
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state=>state.auth);
    const convs = useAppSelector(state=>state.conv.convMap)
    const cookie = new Cookies();

    const socketRequirements = useRef<any[] | null>(null);

    socketRequirements.current = [convs];

    const [ws, wsDispatch] = useReducer(getWsReducer({
        auth,
        cookie
    }), undefined);

    const onOpen = (ws: WebSocket)=>{
        sendWsMesg(auth.token, ws)
    }
    const onClose = (ev: CloseEvent)=>{
        console.log("Socket disconnected and Reconnecting in 5 second")
        setTimeout(()=>{
            if (auth.isAuth){
                wsDispatch({
                    type: WS_TYPE.CONNECT,
                    payload: {
                        onOpen,
                        onMessage,
                        onClose,
                        onError,
                    }
                })
            }
        }, 5000)
    }

    const onMessage = (ev: MessageEvent)=>{
        if (socketRequirements.current){
            onMesgHelper(ev, dispatch, socketRequirements.current[0])
        }

    }
    const onError = (ev: Event)=>{
        if (ws?.readyState != WebSocket.CLOSED){
            ws?.close()
        }
    }

    useEffect(()=>{
        if (auth.isAuth){
            wsDispatch({
                type: WS_TYPE.CONNECT,
                payload: {
                    onOpen,
                    onMessage,
                    onClose,
                    onError,
                }
            })
        }else{
            wsDispatch({
                type: WS_TYPE.CLOSE,
                payload: {}
            })
        }
    }, [auth]);
    return (
        <>
            <WsContext.Provider value={ws}>
            {children}
            </WsContext.Provider>
        </>
    );
}

enum WS_TYPE {
    CONNECT = "CONNECT",
    CLOSE = "CLOSE"
}

interface WsAction {
    type: WS_TYPE,
    payload: {
        onOpen?: (ws: WebSocket)=>void,
        onClose?: (ev: CloseEvent)=>void,
        onError?: (ev: Event)=>void,
        onMessage?: (ev: MessageEvent)=>void
    },
}

const getWsReducer = (props: any) => {
    return (state: WebSocket | undefined, action: WsAction)=>{
        switch (action.type){
            case WS_TYPE.CONNECT:
                const ws = new WebSocket(getChatWsUrl());
                ws.onopen = (ev: Event)=>{
                    if (action.payload.onOpen) action.payload.onOpen(ws)
                }
                if (action.payload.onMessage) ws.onmessage = action.payload.onMessage
                if (action.payload.onClose) ws.onclose = action.payload.onClose
                if (action.payload.onError) ws.onerror = action.payload.onError
                return ws
            case WS_TYPE.CLOSE:
                if (state && state.readyState !== WebSocket.CLOSED) state.close()
                return undefined
            default:
                return state
        }
    }
}
