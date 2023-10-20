import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import counterReducer from "./counter"
import authStore from './auth';
import convStore from './conversation';
import mesgStore from './message';
const store =  configureStore({
reducer: {
    counter: counterReducer,
    auth: authStore,
    conv: convStore,
    mesg: mesgStore,
},
middleware: (mdw)=>mdw({
    serializableCheck: false
})
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
