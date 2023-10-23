import type { UserData } from "@/types/user.type"
import type { UserDict } from "./user"

const checkUser = (users: UserDict, uid: string): UserData | undefined=>{
    return users[uid]
}

export {
    checkUser
}
