type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

type DefaultResponse = {
    success: boolean,
    message: string,
    code: number,
    data?: any
}

type AuthData = {
    token: string,
    username: string,
    code: string,
}
