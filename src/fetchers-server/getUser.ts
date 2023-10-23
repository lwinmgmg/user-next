import { getUserUrlPath } from "../utils/privateEnv";
import serverFetcher from "./fetcher";
import type { UserData } from "@/types/user.type";

export default async function getUserByCode(userCode: string, token: string): Promise<[number, UserData|null]>{
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    try{
        const [status, resp]: [number, UserData] = await serverFetcher(
            getUserUrlPath(`${process.env.USER_SERVICE_USER_ROUTE}/${userCode}`), "GET", headers);
        if (status === 200){
            return [status, resp];
        }
        return [status, resp]
    }catch(e){
        console.log(e);
        return [500, null]
    }
}