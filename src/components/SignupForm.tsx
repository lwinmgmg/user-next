"use client";

import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { FormEvent, useRef } from "react";
import ClientFetcher from "../fetchers-client/fetcher";

export default function SignUpForm(){
    const router = useRouter();

    const firstName = useRef<HTMLInputElement>(null);
    const lastName  = useRef<HTMLInputElement>(null);
    const email     = useRef<HTMLInputElement>(null);
    const username  = useRef<HTMLInputElement>(null);
    const password  = useRef<HTMLInputElement>(null);
    const cPassword = useRef<HTMLInputElement>(null);

    const signUp = (e: FormEvent)=>{
        e.preventDefault();
        const data = {
            first_name : firstName.current?.value,
            last_name  : lastName.current?.value,
            email      : email.current?.value,
            username   : username.current?.value,
            password   : password.current?.value
        }
        ClientFetcher("/api/signup", "POST", data).then(
            (data)=>{
                console.log(data);
            }
        )
        router.push("/user/login")
    }
    return (
        <form onSubmit={signUp}>
            <div className="rounded-lg ring-1 shadow-sm max-w-sm p-5 space-y-5 bg-slate-100 dark:bg-slate-700">
                <div className="grid grid-cols-2 space-x-1">
                    <FormInput label="First Name" innerRef={firstName} />
                    <FormInput label="Last Name" innerRef={lastName} />
                </div>
                <FormInput label="Email" innerRef={email} />
                <FormInput label="Username" innerRef={username} />
                <div className="grid grid-cols-2 space-x-1">
                    <FormInput label="Password" type="password" innerRef={password} />
                    <FormInput label="Confirm Password" type="password" innerRef={cPassword} />
                </div>
                <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400">Sign Up</button>
            </div>
        </form>
    );
}
