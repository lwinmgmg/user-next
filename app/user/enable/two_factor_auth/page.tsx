import AuthMw from "@/src/components/AuthMw";
import OtpConfirmForm from "@/src/components/OtpConfirmForm";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'Enable two factor',
    description: 'Generated by create next app',
}

export default function Login({ searchParams }: {
    searchParams?: {
        back: string
    }
}){
    return (
    <AuthMw>
        <main className="flex h-full w-full flex-col justify-center items-center">
            <h1 className="text-center">Enable two factor</h1>
            <div className="p-5 m-0">
                <OtpConfirmForm url="/api/enable/two_factor_auth" />
            </div>
        </main>
    </AuthMw>);
}