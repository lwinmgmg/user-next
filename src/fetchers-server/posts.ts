export default async function FetchPosts(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {cache:"no-cache"})
    return response.json()
}
