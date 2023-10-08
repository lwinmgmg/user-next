import { deleteServerAuthData } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest){
    const cookie = cookies();
    deleteServerAuthData(cookie);
    return NextResponse.json({});
}