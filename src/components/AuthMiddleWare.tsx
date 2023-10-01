"use client";

import { useEffect } from "react";
import { useAppSelector } from "../store/store";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthMiddleWare({ children }: {
    children: React.ReactNode
}){
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const router = useRouter();
    useEffect(()=>{
        console.log("Changed", isAuth)
    }, [isAuth])
    const login = ()=>{
        console.log("CLidke")
        router.push("/user/login?back=true", {})
    }
    return (
        <>
            {
                isAuth ? children : <h1>Going to <a onClick={login}>login</a></h1>
            }
        </>
    );
}