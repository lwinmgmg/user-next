import type { ConversationDetail } from "@/types/conversationInfo.type"
import clientFetcher from "./fetcher";

export default async function getConversationDetails(convId: string): Promise<ConversationDetail | null>{
    const response : DefaultResponse = await clientFetcher(`/api/chat/conversations/${convId}`, "GET");
    if (response.success){
        return response.data as ConversationDetail
    }
    return null;
}