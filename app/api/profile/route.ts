import serverFetcher from "@/src/fetchers-server/fetcher";
import { getServerToken } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${tkn}`)
    const [status, resp]: [number, {code: string}] = await serverFetcher("http://localhost:8888/api/v1/users/profile", "GET", headers)
    if (status === 200){
        return NextResponse.json<DefaultResponse>({
            success: true,
            code: 200,
            message: "",
            data: resp
        })
    }
    return NextResponse.json<DefaultResponse>({
        success: false,
        code: status,
        message: "Failed to confirm email"
    })
}

export async function PUT(request: NextRequest){
    
}
