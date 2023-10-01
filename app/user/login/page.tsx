import LoginForm from "@/src/components/LoginForm";

export default function Login(){
    return (
    <main className="flex h-full w-full flex-col justify-center items-center">
        <h1 className="text-center">Please login here</h1>
        <div className="p-5 m-0">
            <LoginForm />
        </div>
    </main>);
}
