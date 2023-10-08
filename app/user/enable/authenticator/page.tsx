import AuthMw from "@/src/components/AuthMw";
import OtpConfirmForm from "@/src/components/OtpConfirmForm";

export default function EnableAuthenticator(){
    return (
        <>
        <AuthMw>
            <main className="flex h-full w-full flex-col justify-center items-center">
                <h1 className="text-center">Enable two factor</h1>
                <div className="p-5 m-0">
                    <OtpConfirmForm url="/api/enable/authenticator" />
                </div>
            </main>
        </AuthMw>);
        </>
    );
}