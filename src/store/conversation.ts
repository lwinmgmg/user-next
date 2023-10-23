import type { ConversationDetail, ConversationInfo } from '@/types/conversationInfo.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ConversationDetailDict {
    [key: number]: ConversationDetail
}

export const convStore = createSlice({
name: 'conv',
initialState: {
    activeConv: null as ConversationDetail | null,
    convMap: {} as ConversationDetailDict,
},
reducers: {
    setActiveConv: (state, action: PayloadAction<ConversationDetail>) => {
        state.activeConv = action.payload;
    },

    addConv(state, actions: PayloadAction<ConversationDetail>){
        const tmpObj: ConversationDetailDict = {...state.convMap}
        tmpObj[actions.payload.id] = actions.payload
        state.convMap = tmpObj
    },
    addConvs(state, actions: PayloadAction<ConversationDetail[]>){
        const tmpObj: ConversationDetailDict = {}
        actions.payload.forEach((conv)=>{
            tmpObj[conv.id] = conv
        })
        state.convMap = {
            ...state.convMap,
            ...tmpObj
        }
    }
}
})

export const { setActiveConv, addConv, addConvs } = convStore.actions

export default convStore.reducer
