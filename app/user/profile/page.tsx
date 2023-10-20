"use client";

import AuthMw from "@/src/components/AuthMw";
import ProfileFields from "@/src/components/ProfileFields";
import clientFetcher from "@/src/fetchers-client/fetcher";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserData = {
    "code": string,
    "username": string,
    "is_authenticator": boolean,
    "is_2fa": boolean,
    "partner_data": {
        "first_name": string,
        "last_name": string,
        "email": string,
        "is_email_confirmed": boolean,
        "phone": string,
        "is_phone_confirmed": boolean,
        "code": string
    }
}

export default function ProfilePage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
    const [phone, setPhone] = useState("");
    // const [isPhoneConfirmed, setIsPhoneConfirmed] = useState(false);
    const [is2Fa, setis2Fa] = useState(false);
    const [isAuthr, setIsAuthr] = useState(false);
    useEffect(()=>{
        clientFetcher("/api/profile", "GET").then(
            (res: DefaultResponse) =>{
                const data: UserData = res.data;
                setName(data.partner_data.first_name + " " + data.partner_data.last_name);
                setEmail(data.partner_data.email);
                setIsEmailConfirmed(data.partner_data.is_email_confirmed);
                setPhone(data.partner_data.phone);
                setis2Fa(data.is_2fa);
                setIsAuthr(data.is_authenticator)
            }
        )
    }, [])
    return (
        <>
            <main className="h-full p-10 space-y-4 text-center">
                <AuthMw>
                    <div>
                        <div className="relative h-60 w-60 mx-auto -z-10">
                            <img src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-2-1024x1024.jpg" alt="Profile" className="rounded-full" />
                            <h1 className="absolute right-0 bottom-0"><button className="rounded-full bg-blue-200 ring-1 hover:bg-blue-200/80 p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                            </button></h1>
                        </div>
                    </div>
                    <div>
                        <ProfileFields value={name} onChange={(e)=>setName(e.target.value)} className="text-2xl"/>
                    </div>
                    <ProfileFields value={email} onChange={(e)=>setEmail(e.target.value)}  label="Email"/>
                    {!isEmailConfirmed && <div>
                        <p>Confirm your email <Link className="text-blue-400 font-bold hover:cursor-pointer" href="/user/confirm/email">Here</Link></p>
                    </div>}
                    <ProfileFields value={phone} onChange={(e)=>setPhone(e.target.value)} label="Phone"/>
                    {!is2Fa && <div>
                        <p>Enable two factor authentication. <Link className="text-blue-400 font-bold hover:cursor-pointer" href="/user/enable/two_factor_auth">Click Here</Link></p>
                    </div>}
                    {!isAuthr && <div>
                        <p>Use Authenticator. <Link className="text-blue-400 font-bold hover:cursor-pointer" href="/user/enable/authenticator">Click Here</Link></p>
                    </div>}
                    <div className="flex flex-row justify-center space-x-3">
                        <button className="btn-primary">Save</button>
                        <button className="btn-secondary px-2">Cancel</button>
                    </div>
                </AuthMw>
            </main>
        </>
    );
}
