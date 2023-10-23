export function getChatUrl(){
    return `${process.env.CHAT_SERVICE_HTTP_PREFIX}://${process.env.CHAT_SERVICE_HOST}:${process.env.CHAT_SERVICE_HTTP_PORT}`
}

export function getChatUrlPath(path?: string){
    return `${getChatUrl()}${path}`
}

export function getUserUrl(){
    return `${process.env.USER_SERVICE_HTTP_PREXIX}://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_HTTP_PORT}`
}

export function getUserUrlPath(path?: string){
    return `${getUserUrl()}${path}`
}
