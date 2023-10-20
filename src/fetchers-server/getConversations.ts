import type { ConversationInfo } from "@/types/conversationInfo.type"
import serverFetcher from "./fetcher";
import { getChatUrlPath } from "../utils/privateEnv";

export default async function getConversations(token: string): Promise<[number, ConversationInfo[]]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const [status, resp]: [number, ConversationInfo[]] = await serverFetcher(
        getChatUrlPath(process.env.CHAT_SERVICE_CONV_INFO_ROUTE), "GET", headers);
    if (status === 200){
        return [status, resp];
    }
    return [status, []]
}