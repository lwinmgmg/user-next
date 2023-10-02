"use client";
import { LegacyRef, useState } from "react";

export default function FormInput({ className, label, type, innerRef }:{
    className? : string,
    label?     : string,
    type?      : string,
    innerRef?       : LegacyRef<HTMLInputElement>
}){
    const [isFocus, setIsFocus] = useState(false);
    return (
        <div className={className}>
            <label className="text-xs">{label}</label>
            <input
            ref={innerRef}
            className=" text-slate-700 w-full px-3 py-2 rounded-lg"
            placeholder={isFocus ? undefined : label}
            type={type ? type : "text"}
            onFocus={()=>setIsFocus(true)}
            onBlur={()=>setIsFocus(false)} />
        </div>
    );
}
