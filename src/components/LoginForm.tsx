"use client";

import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "./FormInput";
import { FormEvent } from "react";

export default function LoginForm(){
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useSearchParams()
    const login = (e: FormEvent)=>{
        e.preventDefault();
        dispatch(setAuth());
        if (params.get("back") == "true"? true : false){
            router.back()
        }else{
            router.replace("/")
        }
    }
    return (
        <form onSubmit={login}>
            <div className="rounded-lg ring-1 shadow-sm max-w-sm p-5 space-y-5">
                <FormInput label="Username" />
                <FormInput label="Password" type="password" />
                <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400">Login</button>
            </div>
        </form>
    );
}
