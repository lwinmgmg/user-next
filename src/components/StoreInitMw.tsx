"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import Cookies from "universal-cookie";
import { setAuth } from "../store/auth";

export default function StoreinitMw({ children }: {
    children: React.ReactNode
}){
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const cookie = new Cookies();
    const tkn = cookie.get("tkn");
    useEffect(()=>{
        if (tkn){
            if (!isAuth){
                dispatch(setAuth())
            }
        }
    }, [])
    return (
        <>
            {children}
        </>
    );
}
