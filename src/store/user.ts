import type { UserData } from '@/types/user.type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserDict {
    [key: string]: UserData
}

export const userStore = createSlice({
name: 'user',
initialState: {
    users: {} as UserDict,
},
reducers: {
    addUser(state, actions: PayloadAction<UserData>){
        const tmpObj: UserDict = {}
        tmpObj[actions.payload.code] = actions.payload
        state.users = {
            ...state.users,
            ...tmpObj
        }
    },
    addUsers(state, actions: PayloadAction<UserData[]>){
        const tmpObj: UserDict = {}
        actions.payload.forEach((user)=>{
            tmpObj[user.code] = user
        })
        state.users = {
            ...state.users,
            ...tmpObj
        }
    }
},
})

export const { addUser, addUsers } = userStore.actions

export default userStore.reducer
