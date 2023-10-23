import { MessageDetail } from '@/types/message.type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MessageDetailDict {
    [key: string]: MessageDetail
}

export const mesgStore = createSlice({
name: 'mesg',
initialState: {
    messages: {} as MessageDetailDict,
},
reducers: {
    addMessage(state, actions: PayloadAction<MessageDetail>){
        const tmpObj: MessageDetailDict = {}
        tmpObj[actions.payload.id] = actions.payload
        state.messages = {
            ...state.messages,
            ...tmpObj
        }
    },
    addMessages(state, actions: PayloadAction<MessageDetail[]>){
        const tmpObj: MessageDetailDict = {}
        actions.payload.forEach((mesg)=>{
            tmpObj[mesg.id] = mesg
        })
        state.messages = {
            ...state.messages,
            ...tmpObj
        }
    }
},
})

export const { addMessage, addMessages } = mesgStore.actions

export default mesgStore.reducer
