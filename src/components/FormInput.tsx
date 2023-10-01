"use client";
import { useState } from "react";

export default function FormInput({ className, label, type }:{
    className? : string,
    label?     : string,
    type?      : string
}){
    const [isFocus, setIsFocus] = useState(true);
    return (
        <div className={className}>
            <label className="text-xs">{label}</label>
            <input
            className=" text-slate-700 w-full px-3 py-2 rounded-lg"
            placeholder={isFocus ? undefined : label}
            type={type ? type : "text"}
            onFocus={()=>setIsFocus(true)}
            onBlur={()=>setIsFocus(false)} />
        </div>
    );
}
