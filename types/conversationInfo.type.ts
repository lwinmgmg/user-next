export type ConversationInfo = {
    id: number,
    conv_type: number
    last_mesg_id: string
}

export type ConversationUserDetail = {
    name: string,
    user_id: string,
    conv_id: number
}

export type ConversationDetail = {
    id: number,
    conv_type: number,
    name?: string,
    active: boolean,
    user_id: string,
    img_url?: string,
    last_mesg_id?: string,
    conv_users: ConversationUserDetail[]
}
