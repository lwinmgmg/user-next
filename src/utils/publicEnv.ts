export const getChatWsUrl = ()=>{
    return `${process.env.NEXT_PUBLIC_WS_SERVER_PREFIX}://${process.env.NEXT_PUBLIC_WS_SERVER_HOST}:${process.env.NEXT_PUBLIC_WS_SERVER_PORT}${process.env.NEXT_PUBLIC_WS_CHAT_PATH}`
}
