"use client";

import { useDispatch } from "react-redux";
import { unSetAuth } from "@/src/store/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout(){
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        fetch("/api/logout").then(()=>{
            dispatch(unSetAuth());
            router.replace("/");
            router.refresh();
        })
    }, [dispatch, router])
    return (<h1>Logging out</h1>);
}