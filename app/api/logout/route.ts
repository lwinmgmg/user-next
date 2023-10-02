import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest){
    const cookie = cookies();
    cookie.delete("tkn");
    return NextResponse.json({})
}