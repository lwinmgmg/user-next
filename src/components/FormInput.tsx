"use client";
import { ChangeEvent, LegacyRef, useState } from "react";

export default function FormInput({ className, label, type, maxLength, innerRef, textCenter }:{
    className? : string,
    label?     : string,
    type?      : string,
    maxLength? : number,
    textCenter?: boolean,
    innerRef?       : LegacyRef<HTMLInputElement>,
    onChange?:(e: ChangeEvent<HTMLInputElement>)=>any
}){
    const [isFocus, setIsFocus] = useState(false);
    return (
        <div className={className}>
            <label className="text-xs">{label}</label>
            <input
            ref={innerRef}
            className={`text-slate-700 w-full px-3 py-2 rounded-lg ${textCenter?"text-center":""}`}
            placeholder={isFocus ? undefined : label}
            type={type ? type : "text"}
            maxLength={maxLength}
            onFocus={()=>setIsFocus(true)}
            onBlur={()=>setIsFocus(false)} />
        </div>
    );
}
