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

// Chat Datamodels
type ChatMesg = {
	id?: string,
	parent_id?: string,
    mesg?: string,
    status?: number,
    att_url?: string,
	uid?:string,
	user_list?: string[],
    react_id?: number,
    fields?: string[]
}

type Message = {
	_id: string,
    user_id: string,
    status: number,
    conversation_id: number,
    parent_id?: string,
    excluded_users?: string[],
    message?: string,
    attachment_url?: string,
    old_messages?: Message[],
    is_edited?: boolean,
    updated_time?: number,
	created_time?: number,
}
