

export default function defaultResponse(success: boolean, message: string, code: number, data?: any) : DefaultResponse{
    return {
        success,
        message,
        code,
        data
    }
}
