import { ChangeEvent, useState } from "react";
import FormInput from "./FormInput";

export default function ProfileFields({ value, label, className, onChange }: {
    value: string | number,
    label?: string,
    className?: string,
    onChange?:(e: ChangeEvent<HTMLInputElement>)=>any
}){
    const [isFocus, setIsFocus] = useState(false);
    return (
        <div className="flex flex-row justify-center">
            <h2 className={`text-md ${className}`}>
            <div className={className}>
                <label className="text-xs">{isFocus ? label:false}</label>
                <input
                value={value}
                className={`text-slate-700 w-full px-3 py-2 rounded-lg text-center`}
                placeholder={isFocus ? undefined : label}
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)} 
                onChange={onChange}/>
            </div>
            </h2>
        </div>
    );
}