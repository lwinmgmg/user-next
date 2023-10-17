import { authServer } from "@/src/fetchers-server/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import { setServerAuthData, setServerLogin, setServerLoginOtp } from "@/src/utils/serverCookieData";
import serverFetcher from "@/src/fetchers-server/fetcher";

export async function POST(request: NextRequest){
    const userData: {
        username: string,
        password: string
    } = await request.json();
    const resp = await authServer(userData.username, userData.password);
    const cookie = cookies();
    if (resp.status === 200)
    {
        const data: {access_token:string} = await resp.json();
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${data.access_token}`)
        const [status, respProfile]: [number, {code: string}] = await serverFetcher("http://localhost:8888/api/v1/users/profile", "GET", headers)
        if (status === 200){
            setServerAuthData({
                token: data.access_token,
                username: userData.username,
                code: respProfile.code
            }, cookie);
            return NextResponse.json({success: true, code: 200, message:"Successfully Logined"});
        }else{
            return NextResponse.json({success: false, code: 400, message:`Failed ${respProfile}`})
        }
    }else if (resp.status == 201)
    {
        const data: {access_token:string} = await resp.json();
        setServerLoginOtp(data.access_token, cookie);
        setServerLogin(userData.username, cookie);
        return NextResponse.json({success: true, code: resp.status, message:"Successfully Logined"})
    }else
    {
        const data: {code: number} = await resp.json();
        return NextResponse.json({success: false, code: 400, message:"Failed"})
    }
}
