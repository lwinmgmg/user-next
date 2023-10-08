"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { setAuth, setUsername } from "../store/auth";
import Cookies from "universal-cookie";
import { getClientAuthData } from "../utils/clientCookieData";

export default function AuthMwClient({ children }: {
    children: React.ReactNode,
    tkn?: string
}){
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const router = useRouter();
    const cookie = new Cookies();
    const authData = getClientAuthData(cookie);
    useEffect(()=>{
        const login = ()=>{
            router.push("/user/login?back=true", {})
        }
        if (isAuth) return;
        if (authData) {
            dispatch(setAuth());
            dispatch(setUsername(authData.username));
            return;
        }
        login();
    }, [dispatch, isAuth, router, authData])
    return (
        <>
            {
                isAuth ? children : null
            }
        </>
    );
}