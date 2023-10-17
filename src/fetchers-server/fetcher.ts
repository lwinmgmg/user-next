export default async function serverFetcher<t>(url: string, method: string, headers?: Headers, data?: object): Promise<[number, t]>{
    const resp = await fetch(url, {
        method: method,
        body: data ? JSON.stringify(data) : data,
        headers: headers
    })
    return [resp.status, await resp.json()]
}
