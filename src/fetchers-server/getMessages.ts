import serverFetcher from "./fetcher";
import { getChatUrlPath } from "../utils/privateEnv";
import type { MessageDetail } from "@/types/message.type";

export default async function getMessages(convId: string, lastMesgId: string, limit: number, token: string): Promise<[number, MessageDetail[]]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const [status, resp]: [number, MessageDetail[]] = await serverFetcher(
        getChatUrlPath(`${process.env.CHAT_SERVICE_CONV_INFO_ROUTE}/${convId}/messages/${lastMesgId}?limit=${limit}`), "GET", headers);
    return [status, resp]
}
