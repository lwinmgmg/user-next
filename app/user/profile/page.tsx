import AuthMw from "@/src/components/AuthMw";
import ProfileFields from "@/src/components/ProfileFields";
import Link from "next/link";

export default function ProfilePage(){
    return (
        <>
            <main className="p-10 space-y-4">
                <AuthMw>
                    <div className="text-center relative">
                        <div className="relative h-60 w-60 mx-auto">
                            <img src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-2-1024x1024.jpg" alt="Profile" className="rounded-full" />
                            <h1 className="absolute right-0 bottom-0"><button className="rounded-full bg-blue-200 ring-1 hover:bg-blue-200/80 p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                            </button></h1>
                        </div>

                    </div>
                    <div className="">
                        <ProfileFields className="text-2xl"/>
                    </div>

                    <ProfileFields label="Email"/>
                    <div className="text-center">
                        <p>Confirm your email <Link className="text-blue-400 font-bold hover:cursor-pointer" href="/user/confirm/email">Here</Link></p>
                    </div>
                    <ProfileFields label="Phone"/>
                    <div className="flex flex-row justify-center space-x-3">
                        <button className="btn-primary">Save</button>
                        <button className="btn-secondary px-2">Cancel</button>
                    </div>
                </AuthMw>
            </main>
        </>
    );
}
