import serverFetcher from "@/src/fetchers-server/fetcher";
import { getCookie } from "@/src/utils/getCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const cookie = cookies()
    const tkn = cookie.get("tkn")
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${tkn?.value}`)
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/confirm_email", "GET", headers)
    if (status === 200){
        cookie.set("email_confirm", resp.access_token, {maxAge: 60})
        return NextResponse.json<DefaultResponse>({
            success: true,
            code: 200,
            message: "",
        })
    }
    return NextResponse.json<DefaultResponse>({
        success: false,
        code: status,
        message: "Failed to confirm email"
    })
}

export async function POST(request: NextRequest){
    const data = await request.json()
    return NextResponse.json<DefaultResponse>({
        success: true,
        message: "",
        code: 200,
        data: data
    })
}
