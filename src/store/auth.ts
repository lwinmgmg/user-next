import { createSlice } from '@reduxjs/toolkit'

export const authStore = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false
  },
  reducers: {
    setAuth: state => {
      state.isAuth = true;
    },
    unSetAuth: state => {
      state.isAuth = false;
    }
  }
})

export const { setAuth, unSetAuth } = authStore.actions

export default authStore.reducer
