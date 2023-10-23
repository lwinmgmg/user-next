import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface TypingDict {
    [key: string]: string[]
}

export const typingStore = createSlice({
name: 'typing',
initialState: {
    typings: {} as TypingDict,
},
reducers: {
    addTyping(state, actions: PayloadAction<[string, string]>){
        const tmpObj: TypingDict = {
            ...state.typings
        }
        var userList = tmpObj[actions.payload[0]]
        if (userList){
            userList.push(actions.payload[1])
        }else{
            userList = [actions.payload[1]]
        }
        tmpObj[actions.payload[0]] = userList
        state.typings = tmpObj
    },
    removeTyping(state, actions: PayloadAction<[string, string]>){
        const tmpObj: TypingDict = {
            ...state.typings
        }
        var userList = tmpObj[actions.payload[0]]
        if (userList){
            tmpObj[actions.payload[0]] = userList.filter((res)=>res != actions.payload[1])
        }
        state.typings = tmpObj
    }
},
})

export const { addTyping, removeTyping } = typingStore.actions

export default typingStore.reducer
