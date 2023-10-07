import serverFetcher from "@/src/fetchers-server/fetcher";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ENABLE_TWO_FACTOR = "ksjdkjfklajksjfka"

export async function GET(request: NextRequest){
    const cookie = cookies()
    const tkn = cookie.get("tkn")
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${tkn?.value}`)
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/enable_two_factor", "GET", headers)
    if (status === 200){
        cookie.set(ENABLE_TWO_FACTOR, resp.access_token, {maxAge: 60})
        return NextResponse.json<DefaultResponse>({
            success: true,
            code: 200,
            message: "",
        })
    }
    return NextResponse.json<DefaultResponse>({
        success: false,
        code: status,
        message: "Failed to enable two factor"
    })
}

export async function POST(request: NextRequest){
    const cookie = cookies()
    const email_confirm = cookie.get(ENABLE_TWO_FACTOR)
    const data: { passcode: string } = await request.json()
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/otp_login", "POST", undefined, {
        access_token: email_confirm?.value,
        passcode: data.passcode
    })
    if (status == 200){
        return NextResponse.json<DefaultResponse>({
            success: true,
            message: "",
            code: 200,
            data: resp
        })
    }
    return NextResponse.json<DefaultResponse>({
        success: false,
        message: "Failed to enable two factor",
        code: status,
        data: resp
    })
}
