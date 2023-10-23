import type { TypingDict } from "./isTyping"

const getTyping = (typingDict: TypingDict, convId: string): string[] =>{
    const userList = typingDict[convId]
    if (userList){
        return userList
    }else{
        return []
    }
}

export {
    getTyping
}
