"use client";

import { useDispatch } from "react-redux";
import { setAuth, setUsername } from "../store/auth";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { FormEvent, useEffect, useRef } from "react";
import { authClient } from "../fetchers-client/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAppDispatch, useAppSelector } from "../store/store";

function isBackOrNot(isBack: string | undefined, router: AppRouterInstance){
    if (isBack == 'true'){
        router.back();
    }else{
        router.replace("/");
    }
}

export default function LoginForm({ params }:{
    params?: {
        back: string
    }
}){
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    const dispatch = useDispatch();
    const router = useRouter();
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const login = (e: FormEvent)=>{
        e.preventDefault();
        const usernameStr = username.current?.value || ''
        const passwordStr = password.current?.value || ''
        authClient(usernameStr, passwordStr).then(
            resp=>resp.json()
        ).then((data: { success: boolean, code: number })=>{
            if (data.success){
                if (data.code === 200){
                    dispatch(setAuth());
                    dispatch(setUsername(usernameStr));
                }else if (data.code === 201){
                    router.push("/user/login/otp");
                }
            }else{
                alert("Error");
                console.log(data);
            }
        });
    }
    useEffect(()=>{
        if (isAuth){
            isBackOrNot(params?.back, router);
        }
    }, [isAuth, params, router])
    return (
        <form onSubmit={login}>
            <div className="rounded-lg ring-1 shadow-sm max-w-sm p-5 space-y-5">
                <FormInput label="Username" innerRef={username} />
                <FormInput label="Password" type="password" innerRef={password} />
                <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400">Login</button>
            </div>
        </form>
    );
}
