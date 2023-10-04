"use client";

import { FormEvent, useEffect, useRef } from "react";
import FormInput from "./FormInput";
import clientFetcher from "../fetchers-client/fetcher";
import { useRouter } from "next/navigation";

export default function OtpConfirmForm(){
    const code = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const confirm = (e: FormEvent)=>{
        e.preventDefault();
        clientFetcher("/api/confirm/email", "POST", {
            code: code.current?.value
        }).then((res: DefaultResponse)=>{
            if (res.success){
                router.back();
            }
        })
    }
    useEffect(()=>{
        clientFetcher("/api/confirm/email", "GET").then((res: DefaultResponse) =>{
            if (! res.success){
                throw new Error(res.message)
            }
        });
    }, [])
    return (
        <form onSubmit={confirm}>
            <div className="rounded-lg ring-1 shadow-sm max-w-sm p-5 space-y-5">
                <FormInput label="Otp Code" type="number" maxLength={6} innerRef={code} />
                <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400">Confirm</button>
            </div>
        </form>
    );
}
