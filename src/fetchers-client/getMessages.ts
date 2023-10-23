import { MessageDetail } from "@/types/message.type";
import clientFetcher from "./fetcher";

export default async function getMessages(convId: string, lastMesgId: string, limit: number): Promise<MessageDetail[]>{
    const response : DefaultResponse = await clientFetcher(`/api/chat/conversations/${convId}/messages/${lastMesgId}?limit=${limit}`, "GET");
    if (response.success){
        return response.data as MessageDetail[]
    }
    return [];
}