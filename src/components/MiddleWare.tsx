"use client";

import { useRouter } from 'next/navigation';
import store from '../store/store';
import { Provider } from 'react-redux';


export default function MiddleWare({ children }: {
    children: React.ReactNode
}){
    const router = useRouter()
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
