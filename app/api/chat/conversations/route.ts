import createConversation, { PostConversation } from "@/src/fetchers-server/createConv";
import getConversations from "@/src/fetchers-server/getConversations";
import defaultResponse from "@/src/utils/defaultResponse";
import { getServerToken } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    if (tkn){
        const [status, data] = await getConversations(tkn)
        return NextResponse.json(defaultResponse(status===200, "", status, data))
    }
    return NextResponse.json(defaultResponse(false, "Authentication required", 401))
}

export async function POST(request: NextRequest) {
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    const requestData: PostConversation = await request.json()
    if (tkn){
        const [status, data] = await createConversation(requestData, tkn)
        return NextResponse.json(defaultResponse(status===200, "", status, data))
    }
    return NextResponse.json(defaultResponse(false, "Authentication required", 401))
}
