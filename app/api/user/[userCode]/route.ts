import getUserByCode from "@/src/fetchers-server/getUser";
import defaultResponse from "@/src/utils/defaultResponse";
import { getServerToken } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { userCode } }:{
    params:{
        userCode: string
    }
}){
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    if (tkn){
        const [status, data] = await getUserByCode(userCode, tkn);
        return NextResponse.json(defaultResponse(status===200, "", status, data));
    }
    return NextResponse.json(defaultResponse(false, "Authentication required", 401))
}
