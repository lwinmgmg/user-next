import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const authStore = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    username: ""
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
    }
  }
})

export const { setAuth, unSetAuth, setUsername, unSetUsername } = authStore.actions

export default authStore.reducer
