import { ConversationInfo } from '@/types/conversationInfo.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Conversation = {
    id: number,
    uids: string[]
}

export const convStore = createSlice({
name: 'auth',
initialState: {
    activeUids: [] as string[],
    activeConvId: 0 as number,
    convList: [] as ConversationInfo[],
},
reducers: {
    setActiveConvId: (state, action: PayloadAction<number>) => {
        state.activeConvId = action.payload;
    },
    setConvList: (state, action: PayloadAction<ConversationInfo[]>) => {
        state.convList = [...state.convList, ...action.payload.filter(data=>!(data.id in state.convList.map(conv=>conv.id)))];
    },
    addConvList: (state, action: PayloadAction<ConversationInfo>) => {
        if (state.convList.filter((data)=>data.id == action.payload.id).length == 0){
            state.convList = [...state.convList, action.payload];
        }
    },
}
})

export const { setActiveConvId, setConvList, addConvList } = convStore.actions

export default convStore.reducer
