import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Dict {
    [key: string]: Message
}

export const mesgStore = createSlice({
name: 'mesg',
initialState: {
    messages: {} as Dict,
},
reducers: {
    addMessage(state, actions: PayloadAction<Message>){
        const tmpObj: Dict = {}
        tmpObj[actions.payload._id] = actions.payload
        state.messages = {
            ...state.messages,
            ...tmpObj
        }
    },
    addMessages(state, actions: PayloadAction<Message[]>){
        const tmpObj: Dict = {}
        actions.payload.forEach((mesg)=>{
            tmpObj[mesg._id] = mesg
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
