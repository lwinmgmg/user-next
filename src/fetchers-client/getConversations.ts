import type { ConversationInfo } from "@/types/conversationInfo.type"
import clientFetcher from "./fetcher";

export default async function getConversations(): Promise<ConversationInfo[]>{
    const response : DefaultResponse = await clientFetcher("/api/chat/conversations", "GET");
    if (response.success){
        return response.data as ConversationInfo[]
    }
    return [];
}