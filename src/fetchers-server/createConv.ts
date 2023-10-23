import type { ConversationDetail, } from "@/types/conversationInfo.type"
import serverFetcher from "./fetcher";
import { getChatUrlPath } from "../utils/privateEnv";

export type PostConversation = {
    conv_type: 1 | 2,
    user_list: string[]
}

export default async function createConversation(data: PostConversation, token: string): Promise<[number, ConversationDetail | null]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const [status, resp]: [number, ConversationDetail] = await serverFetcher(
        getChatUrlPath(process.env.CHAT_SERVICE_CONV_INFO_ROUTE), "POST", headers, data);
    return [status, resp]
}
