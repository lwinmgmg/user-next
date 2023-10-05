import AuthMw from "@/src/components/AuthMw";
// import { getCookie } from "@/src/utils/getCookieData";

export default function ProfilePage(){
    // const tkn = getCookie("tkn")
    return (
        <>
            <main className="text-center p-10 space-y-4">
                <AuthMw>
                    <div className="flex flex-row justify-center">
                        <img src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-2-1024x1024.jpg" alt="Profile" className="rounded-full h-60 w-60" />
                    </div>
                    <div className="text-sm">
                        <h1 className="text-2xl">Lwin Maung Maung</h1>
                    </div>
                    <div className="text-sm">
                        <table>
                            <thead>

                            </thead>
                            <tbody className="table-auto">
                                <tr>
                                    <td>ABC</td>
                                    <td> : </td>
                                    <td>ABC</td>
                                </tr>
                                <tr>
                                    <td>ABC</td>
                                    <td> : </td>
                                    <td>ABC</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </AuthMw>
            </main>
        </>
    );
}
