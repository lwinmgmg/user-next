"use client";

import Link from "next/link";
import { useAppSelector } from "../store/store";

export default function NavBar(){
    const isAuth = useAppSelector(state=>state.auth.isAuth);
    return (
        <nav className="py-0 px-3 m-0 flex flex-row justify-between sm:justify-around items-center h-16 bg-slate-100 dark:bg-slate-900 shadow-md sticky">
            <h1 className="text-2xl font-semibold"><Link href="/">Company</Link></h1>
            <div className="hidden sm:block"><input type="text" placeholder="search" /></div>
            <div className="menus hidden sm:block">
                <ul className="flex flex-row items-center space-x-2 menu-item">
                    <li><Link href="/" className="menu-item">Home</Link></li>
                    <li><Link href="/contact" className="menu-item">Contact</Link></li>
                    <li><Link href="/about" className="menu-item">About</Link></li>
                    {
                        isAuth? (
                            <li ><Link href="/user/logout" className="menu-item">Logout</Link></li>
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
                <p>ABC</p>
            </div>
        </nav>
    );
}