import serverFetcher from "@/src/fetchers-server/fetcher";
import { getServerEnable2F, getServerToken, setServerEnable2F } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const cookie = cookies()
    const tkn = getServerToken(cookie);
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${tkn}`);
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/enable_two_factor", "GET", headers)
    if (status === 200)
    {
        setServerEnable2F(resp.access_token, cookie);
        return NextResponse.json<DefaultResponse>({
            success: true,
            code: 200,
            message: "",
        });
    }
    return NextResponse.json<DefaultResponse>({
        success: false,
        code: status,
        message: "Failed to enable two factor"
    });
}

export async function POST(request: NextRequest){
    const cookie = cookies();
    const enable2F = getServerEnable2F(cookie);
    const data: { passcode: string } = await request.json();
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/otp_login", "POST", undefined, {
        access_token: enable2F,
        passcode: data.passcode
    });
    if (status == 200)
    {
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
