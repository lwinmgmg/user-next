"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { setAuth, setUsername } from "../store/auth";
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
    const username = cookie.get("username")
    useEffect(()=>{
        console.log(username);
        const login = ()=>{
            router.push("/user/login?back=true", {})
        }
        if (isAuth && username) return;
        if (tkn) {
            dispatch(setAuth());
            dispatch(setUsername(username));
            return;
        }
        login();
    }, [dispatch, isAuth, router, tkn, username])
    return (
        <>
            {
                isAuth ? children : null
            }
        </>
    );
}