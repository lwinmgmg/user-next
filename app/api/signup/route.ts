import serverFetcher from "@/src/fetchers-server/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    const data = await request.json();
    const [status, resp] : [number, any] = await serverFetcher("http://localhost:8888/api/v1/func/users/signup", "POST", undefined, data)
    if (status == 200){
        return NextResponse.json<DefaultResponse>({
            success: true,
            code : status,
            message : "Successfully signup",
            data
        })
    }
    return NextResponse.json<DefaultResponse>({
            success: false,
            code : status,
            message : "Signup Failed",
            data: resp
        });
}
