"use client";

import type { ConversationDetail } from "@/types/conversationInfo.type";
import clientFetcher from "./fetcher";

export default async function createConversation(convType: 1|2, userIds: string[]): Promise<ConversationDetail | null>{
    const response : DefaultResponse = await clientFetcher("/api/chat/conversations", "POST", {
        conv_type: convType,
        user_list: userIds
    })
    if (response.success){
        return response.data as ConversationDetail
    }
    return null
}
