"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import Cookies from "universal-cookie";
import { setAuth, setUsername } from "../store/auth";
import { getClientAuthData } from "../utils/clientCookieData";

export default function StoreInitMw({ children }: {
    children: React.ReactNode
}){
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
        console.log("Runned");
    }, [dispatch, authData, isAuth])
    return (
        <>
            {children}
        </>
    );
}
