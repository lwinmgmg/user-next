"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { setAuth } from "../store/auth";

export default function AuthMwClient({ children, tkn }: {
    children: React.ReactNode,
    tkn?: string
}){
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const router = useRouter();
    useEffect(()=>{
        const login = ()=>{
            router.push("/user/login?back=true", {})
        }
        console.log(tkn);
        if (isAuth) return;
        if (tkn) {
            dispatch(setAuth());
            return;
        }
        login();
    }, [dispatch, isAuth, router])
    return (
        <>
            {
                isAuth ? children : null
            }
        </>
    );
}