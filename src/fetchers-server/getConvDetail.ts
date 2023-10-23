import type { ConversationDetail, ConversationInfo } from "@/types/conversationInfo.type"
import serverFetcher from "./fetcher";
import { getChatUrlPath } from "../utils/privateEnv";

export default async function getConversationDetails(convId: string, token: string): Promise<[number, ConversationDetail]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const [status, resp]: [number, ConversationDetail] = await serverFetcher(
        getChatUrlPath(`${process.env.CHAT_SERVICE_CONV_INFO_ROUTE}/${convId}`), "GET", headers);
    if (status === 200){
        return [status, resp];
    }
    return [status, resp]
}
