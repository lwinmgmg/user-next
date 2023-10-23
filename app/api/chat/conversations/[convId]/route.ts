import getConversationDetails from "@/src/fetchers-server/getConvDetail";
import defaultResponse from "@/src/utils/defaultResponse";
import { getServerToken } from "@/src/utils/serverCookieData";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { convId } }:{
    params:{
        convId: string
    }
}){
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    if (tkn){
        const [status, data] = await getConversationDetails(convId, tkn)
        return NextResponse.json(defaultResponse(status===200, "", status, data))
    }
    return NextResponse.json(defaultResponse(false, "Authentication required", 401))
}
