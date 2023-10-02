export async function authServer(username: string, password: string){
    const resp = await fetch("http://localhost:8888/api/v1/func/users/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    })
    return resp
}
