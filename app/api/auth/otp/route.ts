import serverFetcher from "@/src/fetchers-server/fetcher";
import { getServerLogin, getServerLoginOtp, setServerAuthData } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const cookie = cookies();
    const loginOtp = getServerLoginOtp(cookie);
    const username = getServerLogin(cookie);
    const data: { passcode: string } = await request.json();
    const [status, resp]: [number, {access_token: string} | any] = await serverFetcher("http://localhost:8888/api/v1/func/users/otp_login", "POST", undefined, {
        access_token: loginOtp,
        passcode: data.passcode
    });
    if (status == 200)
    {
        if (username){
            setServerAuthData({
                token: resp.access_token,
                username: username
            }, cookie);
            return NextResponse.json<DefaultResponse>({
                success: true,
                message: "",
                code: 200,
                data: resp
            });
        }
    }
    return NextResponse.json<DefaultResponse>({
        success: false,
        message: "Failed to enable two factor",
        code: status,
        data: resp
    })
}
