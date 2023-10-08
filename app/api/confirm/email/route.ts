import serverFetcher from "@/src/fetchers-server/fetcher";
import { getServerEmailConfirm, getServerToken, setServerEmailConfirm } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${tkn}`)
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/confirm_email", "GET", headers)
    if (status === 200){
        setServerEmailConfirm(resp.access_token, cookie);
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
    const cookie = cookies()
    const emailComfirm = getServerEmailConfirm(cookie)
    const data: { passcode: string } = await request.json()
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/otp_login", "POST", undefined, {
        access_token: emailComfirm,
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
        message: "Failed to confirm email",
        code: status,
        data: resp
    })
}
