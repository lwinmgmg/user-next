"use client";

import { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import clientFetcher from "../fetchers-client/fetcher";
import { useRouter } from "next/navigation";
import { authClient } from "../fetchers-client/auth";
import { getClientUsername } from "../utils/clientCookieData";
import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setAuth } from "../store/auth";

export default function OtpConfirmForm({ url, needPass }: {
    url: string,
    needPass?: boolean
}){
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state=>state.auth.isAuth)
    const cookie = new Cookies();
    const code = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [counter, setCounter] = useState(60);
    const [isNeedPass, setIsNeedPass] = useState(needPass);
    const [b64Img, setB64Img] = useState<string>('');
    const [secret, setSecret] = useState('');
    const counterRef: { current: NodeJS.Timeout | null } = useRef<NodeJS.Timeout>(null);
    const router = useRouter()
    const counterReset = ()=>{
        setCounter(60);
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
            passcode: code.current?.value,
        }).then((res: DefaultResponse)=>{
            if (res.success){
                if (!isAuth){
                    dispatch(setAuth());
                }
                router.back();
            }else{
                console.log(res);
            }
        })
        setCounter(0);
    }
    const passConfirm = ()=>{
        const usernameStr = getClientUsername(cookie);
        const passwordStr = password.current?.value;
        if (usernameStr && passwordStr){
            authClient(usernameStr, passwordStr).then(
                resp=>resp.json()
            ).then(
                (data: DefaultResponse)=>{
                    if (data.success){
                        setIsNeedPass(false);
                        clientFetcher(url, "GET").then((res: DefaultResponse) =>{
                            if (! res.success){
                                throw new Error(res.message)
                            }else{
                                if (res.data && res.data.image){
                                    setB64Img(res.data.image);
                                }
                                if (res.data && res.data.key){
                                    setSecret(res.data.key);
                                }
                            }
                        });
                        counterReset();
                        return
                    }
                    throw new Error("Auth Error")
                }
            ).catch(err=>{
                alert(err);
            })
        }
    }
    const retry = ()=>{
        clientFetcher(url, "GET").then((res: DefaultResponse) =>{
            if (! res.success){
                throw new Error(res.message)
            }else{
                if (res.data && res.data.image){
                    setB64Img(res.data.image);
                }
                if (res.data && res.data.key){
                    setSecret(res.data.key);
                }
            }
        });
        counterReset();
    }
    const backToLogin = ()=>{
        router.back();
    }
    useEffect(()=>{
        if (needPass){
            return
        }
        counterReset();
        return ()=>{
            if (counterRef.current){
                clearInterval(counterRef.current);
            }
        }
    },[])
    return (
        <div className="rounded-lg ring-1 shadow-sm max-w-sm p-5 space-y-5">
            {
                b64Img && b64Img !== '' && <img src={`data:image/png;base64,${b64Img}`} alt="QR code" className="h-full w-full" />
            }
            {
                secret && secret !== '' && <p>{secret}</p>
            }
            {
                isNeedPass? 
                (
                    <>
                        <FormInput label="Passwrod" type="password" innerRef={password} />
                        <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400" onClick={passConfirm}>Confirm</button>
                    </>
                ):(
                <>
                    <FormInput label="Otp Code" type="number" maxLength={6} innerRef={code} />
                    <div className="flex flex-row space-x-3">
                        <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400" onClick={confirm}>Confirm</button>
                        {
                            needPass?<button className="w-full rounded-md py-2 bg-slate-100 hover:bg-slate-100/90 hover:text-blue-100 disabled:bg-slate-100/90 disabled:hover:bg-slate-100/90 disabled:text-slate-500 disabled:hover:text-slate-500" disabled={counter > 0} onClick={retry}>{counter > 0 ? `${counter}s`:"Resent"}</button>:
                            <button className="w-full rounded-md py-2 bg-slate-100 hover:bg-slate-100/90 hover:text-blue-100 disabled:bg-slate-100/90 disabled:hover:bg-slate-100/90 disabled:text-slate-500 disabled:hover:text-slate-500" disabled={counter > 0} onClick={backToLogin}>{counter > 0 ? `${counter}s`:"BackToLogin"}</button>
                        }
                        
                    </div>
                </>)
            }

        </div>
    );
}
