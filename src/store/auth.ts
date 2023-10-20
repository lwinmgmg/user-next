import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const authStore = createSlice({
name: 'auth',
initialState: {
    isAuth: false,
    username: "",
    uid: "",
    token: "",
},
reducers: {
    setAuth: state => {
    state.isAuth = true;
    },
    unSetAuth: state => {
    state.isAuth = false;
    },
    setUsername: (state, action: PayloadAction<string>) =>{
    state.username = action.payload
    },
    unSetUsername: (state, action: PayloadAction<string>) =>{
    state.username = action.payload
    },
    setUid: (state, action: PayloadAction<string>)=>{
    state.uid = action.payload
    },
    setToken: (state, action: PayloadAction<string>)=>{
    state.token = action.payload
    }
}
})

export const { setAuth, unSetAuth, setUsername, unSetUsername, setUid, setToken } = authStore.actions

export default authStore.reducer
