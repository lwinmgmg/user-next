import { authServer } from "@/src/fetchers-server/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"

const AuthTimeout = 24 * 3600;

export async function POST(request: NextRequest){
    const userData: {
        username: string,
        password: string
    } = await request.json();
    const resp = await authServer(userData.username, userData.password);
    if (resp.status == 200){
        const data: {access_token:string} = await resp.json()
        const cookie = cookies()
        cookie.set("tkn", data.access_token, {
            maxAge: AuthTimeout,
        })
        cookie.set("username", userData.username, {
            maxAge: AuthTimeout,
        })
        return NextResponse.json({success: true, code: 200, message:"Successfully Logined"});
    }else if (resp.status == 202){
        return NextResponse.json({success: true, code: 202, message:"Successfully Logined", data: await resp.json()})
    }else{
        const data: {code: number} = await resp.json();
        console.log(data);
        return NextResponse.json({success: false, code: 400, message:"Failed"})
    }
}
