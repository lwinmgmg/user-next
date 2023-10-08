import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { AUTH_KV } from "../constants/AuthConstants";

export default function getServerCookie(key: string, cookie: ReadonlyRequestCookies){
    return cookie.get(key);
}

function getServerToken(cookie: ReadonlyRequestCookies): string | undefined{
    const authCookie = cookie.get(AUTH_KV.authCkKey);
    if (authCookie)
    {
        const data: AuthData = JSON.parse(authCookie.value);
        return data.token;
    }
}

function getServerUsername(cookie: ReadonlyRequestCookies): string | undefined
{
    const authCookie = cookie.get(AUTH_KV.authCkKey);
    if (authCookie)
    {
        const data: AuthData = JSON.parse(authCookie.value);
        return data.username;
    }
}

function getServerAuthData(cookie: ReadonlyRequestCookies): AuthData | undefined
{
    const authCookie = cookie.get(AUTH_KV.authCkKey);
    if (authCookie)
    {
        const data: AuthData = JSON.parse(authCookie.value);
        return data;
    }
}

function setServerAuthData(data: AuthData, cookie: ReadonlyRequestCookies){
    return cookie.set(AUTH_KV.authCkKey, JSON.stringify(data), {
        maxAge: AUTH_KV.loginTimeout,
    });
}

function deleteServerAuthData(cookie: ReadonlyRequestCookies){
    return cookie.delete(AUTH_KV.authCkKey);
}

function getServerEmailConfirm(cookie: ReadonlyRequestCookies): string | undefined{
    return cookie.get(AUTH_KV.emailConfirmCkKey)?.value
}

function setServerEmailConfirm(value: string, cookie: ReadonlyRequestCookies){
    return cookie.set(AUTH_KV.emailConfirmCkKey, value, {
        maxAge: AUTH_KV.emailConfirmTimeout
    });
}

function getServerEnableAuth(cookie: ReadonlyRequestCookies): string | undefined{
    return cookie.get(AUTH_KV.enableAuthCkKey)?.value;
}

function setServerEnableAuth(value: string, cookie: ReadonlyRequestCookies){
    return cookie.set(AUTH_KV.enableAuthCkKey, value, {
        maxAge: AUTH_KV.enableAuthTimeout
    });
}

function getServerEnable2F(cookie: ReadonlyRequestCookies): string | undefined{
    return cookie.get(AUTH_KV.enable2FCkKey)?.value;
}

function setServerEnable2F(value: string, cookie: ReadonlyRequestCookies){
    return cookie.set(AUTH_KV.enable2FCkKey, value, {
        maxAge: AUTH_KV.enable2FTimout
    });
}

function getServerLogin(cookie: ReadonlyRequestCookies): string | undefined{
    return cookie.get(AUTH_KV.loginName)?.value;
}

function setServerLogin(value: string, cookie: ReadonlyRequestCookies){
    return cookie.set(AUTH_KV.loginName, value, {
        maxAge: AUTH_KV.loginNameTimeout
    });
}
function getServerLoginOtp(cookie: ReadonlyRequestCookies): string | undefined{
    return cookie.get(AUTH_KV.loginOtp)?.value;
}

function setServerLoginOtp(value: string, cookie: ReadonlyRequestCookies){
    return cookie.set(AUTH_KV.loginOtp, value, {
        maxAge: AUTH_KV.loginOtpTimeout
    });
}

export {
    getServerUsername, getServerToken, getServerAuthData, setServerAuthData, deleteServerAuthData,
    getServerEmailConfirm, setServerEmailConfirm,
    getServerEnableAuth, setServerEnableAuth,
    getServerEnable2F, setServerEnable2F,
    getServerLoginOtp, setServerLoginOtp,
    getServerLogin, setServerLogin,
}
