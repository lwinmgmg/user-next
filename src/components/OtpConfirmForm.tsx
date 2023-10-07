"use client";

import { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import clientFetcher from "../fetchers-client/fetcher";
import { useRouter } from "next/navigation";

export default function OtpConfirmForm({ url }: {
    url: string
}){
    const code = useRef<HTMLInputElement>(null);
    const [counter, setCounter] = useState(60);
    const counterRef: { current: NodeJS.Timeout | null } = useRef<NodeJS.Timeout>(null)
    const router = useRouter()
    const counterReset = ()=>{
        counterRef.current = setInterval(()=>{
            setCounter(count=>count-1)
            if (counter == 0){
                if (counterRef.current){
                    clearInterval(counterRef.current)
                }
            }
        }, 1000)
    }
    const confirm = ()=>{
        clientFetcher(url, "POST", {
            passcode: code.current?.value
        }).then((res: DefaultResponse)=>{
            if (res.success){
                router.back()
            }else{
                console.log(res);
            }
        })
        setCounter(0);
    }
    const retry = ()=>{
        clientFetcher(url, "GET").then((res: DefaultResponse) =>{
            if (! res.success){
                throw new Error(res.message)
            }
        });
        setCounter(60)
        counterReset();
    }
    useEffect(()=>{
        clientFetcher(url, "GET").then((res: DefaultResponse) =>{
            if (! res.success){
                console.error("Failed")
            }
        });
        counterReset();
        return ()=>{
            if (counterRef.current){
                clearInterval(counterRef.current);
            }
        }
    }, [])
    return (
        <div className="rounded-lg ring-1 shadow-sm max-w-sm p-5 space-y-5">
            <FormInput label="Otp Code" type="number" maxLength={6} innerRef={code} />
            <div className="flex flex-row space-x-3">
                <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400" onClick={confirm}>Confirm</button>
                <button className="w-full rounded-md py-2 bg-slate-100 hover:bg-slate-100/90 hover:text-blue-100 disabled:bg-slate-100/90 disabled:hover:bg-slate-100/90 disabled:text-slate-500 disabled:hover:text-slate-500" disabled={counter > 0} onClick={retry}>{counter > 0 ? `${counter}s`:"Resent"}</button>
            </div>
        </div>
    );
}
