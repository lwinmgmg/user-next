import { UserData } from "@/types/user.type";
import clientFetcher from "./fetcher";

export default async function getUserByCode(userCode: string): Promise<UserData | null>{
    const response : DefaultResponse = await clientFetcher(`/api/user/${userCode}`, "GET");
    if (response.success){
        return response.data as UserData
    }
    return null;
}