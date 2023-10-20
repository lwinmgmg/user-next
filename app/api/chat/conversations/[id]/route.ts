import serverFetcher from "@/src/fetchers-server/fetcher";
import getConversationDetails from "@/src/fetchers-server/getConvDetail";
import defaultResponse from "@/src/utils/defaultResponse";
import { getServerToken } from "@/src/utils/serverCookieData";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest, { params: { id } }:{
    params:{
        id: string
    }
}){
    const cookie = cookies();
    const tkn = getServerToken(cookie);
    if (tkn){
        const [status, data] = await getConversationDetails(id, tkn)
        return NextResponse.json(defaultResponse(status===200, "", status, data))
    }
    return NextResponse.json(defaultResponse(false, "Authentication required", 401))
}
