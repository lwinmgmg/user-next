export default function ClientFetcher(url: string, method: string, data?: object){
    return fetch(url, {
        method: method,
        body: data ? JSON.stringify(data) : undefined,
    }).then(resp=>resp.json()).then(data=>data)
}