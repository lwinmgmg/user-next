"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { setAuth } from "../store/auth";
import Cookies from "universal-cookie";

export default function AuthMwClient({ children }: {
    children: React.ReactNode,
    tkn?: string
}){
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const router = useRouter();
    const cookie = new Cookies()
    const tkn = cookie.get("tkn")
    useEffect(()=>{
        const login = ()=>{
            router.push("/user/login?back=true", {})
        }
        if (isAuth) return;
        if (tkn) {
            dispatch(setAuth());
            return;
        }
        login();
    }, [dispatch, isAuth, router, tkn])
    return (
        <>
            {
                isAuth ? children : null
            }
        </>
    );
}