import serverFetcher from "@/src/fetchers-server/fetcher";
import { getServerEnableAuth, getServerToken, setServerEnableAuth } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const cookie = cookies()
    const tkn = getServerToken(cookie);
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${tkn}`)
    const [status, resp]: [number, {access_token: string, image: string, key: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/enable_auth", "GET", headers)
    if (status === 200){
        setServerEnableAuth(resp.access_token, cookie);
        return NextResponse.json<DefaultResponse>({
            success: true,
            code: 200,
            message: "",
            data: {
                image: resp.image,
                key: resp.key,
            }
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
    const enableAuth = getServerEnableAuth(cookie);
    const data: { passcode: string } = await request.json();
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/otp_login", "POST", undefined, {
        access_token: enableAuth,
        passcode: data.passcode
    });
    if (status == 200){
        return NextResponse.json<DefaultResponse>({
            success: true,
            message: "",
            code: 200,
            data: resp
        });
    }
    return NextResponse.json<DefaultResponse>({
        success: false,
        message: "Failed to enable two factor",
        code: status,
        data: resp
    });
}
