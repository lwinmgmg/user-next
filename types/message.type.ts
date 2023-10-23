export type MessageDetail = {
    id: string,
    parent_id?: string,
    user_id: string,
    excluded_users?: string[],
    conversation_id: number,
    mesg?: string,
    att_url?: string,
    old_messages?: Message[],
    status: number,
    is_edited?: boolean,
    updated_time: number,
    created_time: number
}

export type ChatMessage = {
    id: string,
    parent_id?: string,
    user_id: string,
    user_list?: string[],
    excluded_users?: string[],
    conversation_id: number,
    mesg?: string,
    att_url?: string,
    old_messages?: Message[],
    status: number,
    is_edited?: boolean,
    react_id?: number,
    updated_time: number,
    created_time: number,
    fields?: string[],
}

export type ChatData = {
    name: string,
    conversation_id: number,
    conv_type:number,
    last_mesg_id: string,
    chat_type: string,
    mesg: ChatMessage,
    img_url?: string
}
