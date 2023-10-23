import getMessages from "@/src/fetchers-server/getMessages";
import defaultResponse from "@/src/utils/defaultResponse";
import { getServerToken } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params:{
    convId, mesgId
} }:{
    params:{
        convId: string,
        mesgId: string
    }
}){
    var limit = 10;
    var queryLimit = request.nextUrl.searchParams.get("limit");
    if (queryLimit){
        limit = Number(queryLimit)
        if (Number.isNaN(limit)){
            limit = 10
        }
    }
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    if (tkn){
        const [status, data] = await getMessages(convId, mesgId, limit, tkn)
        return NextResponse.json(defaultResponse(status===200, "", status, data))
    }
    return NextResponse.json(defaultResponse(false, "Authentication required", 401))
}
