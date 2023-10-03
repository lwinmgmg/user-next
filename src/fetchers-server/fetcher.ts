export default async function ServerFetcher(url: string, method: string, data?: object){
    const resp = await fetch(url, {
        method: method,
        body: data ? JSON.stringify(data) : undefined,
    })
    return resp.status, resp.json()
}
