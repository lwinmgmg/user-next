import { type Metadata } from "next";
import LoginForm from "@/src/components/LoginForm";

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Generated by create next app',
}

export default function Login({ searchParams }: {
    searchParams?: {
        back: string
    }
}){
    return (
    <main className="flex w-full flex-col justify-center items-center">
        <h1 className="text-center">Please login here</h1>
        <div className="p-5 m-0">
            <LoginForm params={searchParams} />
        </div>
    </main>);
}
