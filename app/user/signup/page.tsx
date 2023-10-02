import SignUpForm from "@/src/components/SignupForm";

export default function Signup(){
    return (
    <main className="flex h-full w-full flex-col justify-center items-center">
        <h1 className="text-center">Please login here</h1>
        <div className="p-5 m-0">
            <SignUpForm />
        </div>
    </main>);
}