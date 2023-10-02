export function authClient(username: string, password: string){
    return fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    })
}
