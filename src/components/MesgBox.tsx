"use client";

import { MessageDetail } from "@/types/message.type"
import { useState } from "react"

export default function MesgBox({ mesg, isOwner }:{
    mesg: MessageDetail,
    isOwner?: boolean
}){
    const ownerClass = "p-2 text-right"
    const ownerSpanClass = "bg-blue-400 p-3 rounded-s-xl rounded-se-xl inline-block whitespace-pre-line text-left"
    const othersClass = "p-2 text-left"
    const othersSpanClass = "bg-blue-300 p-3 rounded-e-xl rounded-ss-xl inline-block whitespace-pre-line text-left"
    const [mesgDt, setMesgDt] = useState(new Date(mesg.created_time*2));
    const [showToolTip, setShowToolTip] = useState(false);
    return (
        <>
        <p className={isOwner ? ownerClass:othersClass} data-tooltip-target="tooltip-top" data-tooltip-placement="top"><span onFocus={()=>setShowToolTip(true)} onMouseEnter={()=>setShowToolTip(true)} onMouseLeave={()=>setShowToolTip(false)} onBlur={()=>setShowToolTip(false)} className={isOwner? ownerSpanClass:othersSpanClass}>{mesg.mesg}</span></p>
        
        {showToolTip? (<div id="tooltip-top" role="tooltip" className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-60 tooltip dark:bg-gray-700">
            {mesgDt.toLocaleString()}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>):null}
        </>
    );
}