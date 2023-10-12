"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import Cookies from "universal-cookie";
import { setAuth, setUsername } from "../store/auth";
import { getClientAuthData } from "../utils/clientCookieData";
import { WsContext } from "../store/socket";
import onOpen from "../socket/onOpen";
import onMessage from "../socket/onMessage";
import onError from "../socket/onError";

export default function StoreInitMw({ children }: {
    children: React.ReactNode
}){
    const socketUrl = "ws://localhost:8079/ws";
    const [ws, setWs] = useState<WebSocket>();
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const cookie = new Cookies();
    const authData = getClientAuthData(cookie);
    useEffect(()=>{
        if (authData){
            if (!isAuth){
                dispatch(setAuth());
                dispatch(setUsername(authData.username));
            }
        }
    }, [dispatch, authData, isAuth])

    useEffect(()=>{
        if (!ws){
            setWs(new WebSocket(socketUrl))
            return
        }
        if (ws.readyState !== ws.CLOSED){
            if (!ws.onopen){
                ws.onopen = onOpen(ws);
            }
            if (!ws.onmessage){
                ws.onmessage = onMessage;
            }
            if (!ws.onerror){
                ws.onerror = onError(ws);
            }
            if (!ws.onclose){
                ws.onclose = ()=>{
                    setTimeout(()=>{
                        setWs(new WebSocket(socketUrl))
                    }, 5000)
                }
            }
        }
        return ()=>{
            if (ws.readyState !== ws.CLOSED){
                ws.close()
            }
        }
    }, [socketUrl, ws])
    return (
        <WsContext.Provider value={ws}>
            {children}
        </WsContext.Provider>
    );
}
