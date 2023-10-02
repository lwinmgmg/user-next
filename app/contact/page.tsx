import AuthMw from "@/src/components/AuthMw";
import FetchPosts from "@/src/fetchers-server/posts";

export default async function Contact(props: any){
    const postsResponse: Promise<Post[]> = FetchPosts()
    const posts = await postsResponse;
    return (
        <AuthMw>
            <main>
                <h1>Contact</h1>
                {
                    posts.map(post => (
                        <ul key={post.id}>
                            <li>{post.id}</li>
                            <li>{post.title}</li>
                            <li>{post.body}</li>
                        </ul>
                    ))
                }
            </main>
        </AuthMw>
    );
}