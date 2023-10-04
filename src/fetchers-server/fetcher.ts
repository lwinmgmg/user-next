export default async function serverFetcher(url: string, method: string, headers?: Headers, data?: object): Promise<[number, Promise<any>]>{
    
    const resp = await fetch(url, {
        method: method,
        body: data ? JSON.stringify(data) : undefined,
        headers: headers
    })
    return [resp.status, await resp.json()]
}
