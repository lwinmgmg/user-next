"use client";
import { LegacyRef, useState } from "react";

export default function FormInput({ className, label, type, maxLength, innerRef }:{
    className? : string,
    label?     : string,
    type?      : string,
    maxLength? : number,
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
            maxLength={maxLength}
            onFocus={()=>setIsFocus(true)}
            onBlur={()=>setIsFocus(false)} />
        </div>
    );
}
