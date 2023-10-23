"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import Cookies from "universal-cookie";
import { setAuth, setToken, setUid, setUsername } from "../store/auth";
import { getClientAuthData } from "../utils/clientCookieData";
import WsInitMw from "./WsInitMw";

export default function StoreInitMw({ children }: {
    children: React.ReactNode
}){
    const socketUrl = "ws://localhost:8079/ws";

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const cookie = new Cookies();
    const authData = getClientAuthData(cookie);
    useEffect(()=>{
        if (authData){
            if (!isAuth){
                dispatch(setAuth());
            }
            dispatch(setUsername(authData.username));
            dispatch(setUid(authData.code))
            dispatch(setToken(authData.token))
        }
    }, [dispatch, authData, isAuth])

    return (
        <WsInitMw>
            {children}
        </WsInitMw>
    );
}
