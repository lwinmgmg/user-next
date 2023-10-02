"use client";

import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { FormEvent } from "react";

export default function SignUpForm(){
    const router = useRouter();
    const signUp = (e: FormEvent)=>{
        e.preventDefault();
        router.push("/user/login")
    }
    return (
        <form onSubmit={signUp}>
            <div className="rounded-lg ring-1 shadow-sm max-w-sm p-5 space-y-5 bg-slate-100 dark:bg-slate-700">
                <div className="grid grid-cols-2 space-x-1">
                    <FormInput label="First Name" />
                    <FormInput label="Last Name" />
                </div>
                <FormInput label="Email" />
                <FormInput label="Username" />
                <div className="grid grid-cols-2 space-x-1">
                    <FormInput label="Password" type="password" />
                    <FormInput label="Confirm Password" type="password" />
                </div>
                <button className="w-full rounded-md py-2  bg-slate-500 hover:bg-slate-500/90 hover:text-blue-400">Sign Up</button>
            </div>
        </form>
    );
}
