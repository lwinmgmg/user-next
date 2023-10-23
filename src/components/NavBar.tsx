"use client";

import Link from "next/link";
import { useAppSelector } from "../store/store";
import DropDown from "./DropDown";

export default function NavBar(){
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    return (
        <nav className="py-5 px-3 m-0 flex flex-row justify-between sm:justify-around items-center h-16 bg-slate-100 dark:bg-slate-900 shadow-md sticky">
            <h1 className="text-2xl font-semibold"><Link href="/">Company</Link></h1>
            <div className="hidden sm:block"><input type="text" placeholder="search" /></div>
            <div className="menus hidden sm:block">
                <ul className="flex flex-row items-center space-x-4">
                    <li><Link href="/" className="menu-item">Home</Link></li>
                    <li><Link href="/contact" className="menu-item">Contact</Link></li>
                    <li><Link href="/chat" className="menu-item">Chat</Link></li>
                    {
                        isAuth? (
                            <li className=""><DropDown ><img className="rounded-full h-8 w-8" src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-2-1024x1024.jpg" alt="Profile" /></DropDown></li>
                        ):(
                            <>
                                <li><Link href="/user/login" className="menu-item">Login</Link></li>
                                <li><Link href="/user/signup" className="menu-item">Sign Up</Link></li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div className="sm:hidden">
                {
                    isAuth ? <DropDown ><img className="rounded-full h-8 w-8" src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-2-1024x1024.jpg" alt="Profile" /></DropDown>:null
                }
            </div>
        </nav>
    );
}
