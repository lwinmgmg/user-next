"use client";

import Cookies from "universal-cookie";
import { AUTH_KV } from "../constants/AuthConstants";

function getClientCookie(key: string)
{
    const cookie = new Cookies();
    return cookie.get(key);
}

function getClientUsername(cookie: Cookies): string | undefined
{
    const authCookie: AuthData | undefined = cookie.get(AUTH_KV.authCkKey);

    if (authCookie)
    {
        return authCookie.username;
    }
}

function getClientToken(cookie: Cookies): string | undefined
{
    const authCookie: AuthData | undefined = cookie.get(AUTH_KV.authCkKey);
    if (authCookie)
    {
        return authCookie.token;
    }
}

function getClientAuthData(cookie: Cookies): AuthData | undefined
{
    const authCookie: AuthData | undefined = cookie.get(AUTH_KV.authCkKey);
    if (authCookie)
    {
        return authCookie;
    }
}

export {
    getClientCookie, getClientUsername, getClientToken, getClientAuthData
}
