import AuthMw from "@/src/components/AuthMw";
import OtpConfirmForm from "@/src/components/OtpConfirmForm";

export default function OtpLogin(){
    return (
        <>
            <main className="flex h-full w-full flex-col justify-center items-center">
                <h1 className="text-center">Two factor</h1>
                <div className="p-5 m-0">
                    <OtpConfirmForm url="/api/auth/otp" />
                </div>
            </main>);
        </>
    );
}
