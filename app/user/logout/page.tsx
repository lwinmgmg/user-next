import { cookies } from "next/headers";
import Logout from "@/src/components/Logout";

export default async function LogoutPage(){
    return (<>
        <Logout />
    </>);
}