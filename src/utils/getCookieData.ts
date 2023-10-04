import { cookies } from "next/headers"

export function getCookie(key: string){
    const cookie = cookies();
    return cookie.get(key)
}
