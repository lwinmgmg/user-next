import AuthMw from "@/src/components/AuthMw";
import FetchPosts from "@/src/fetchers-server/posts";

export default async function Contact(props: any){
    const postsResponse: Promise<Post[]> = FetchPosts()
    const posts = await postsResponse;
    return (
        <AuthMw>
            <main>
                <h1>Contact</h1>
            </main>
        </AuthMw>
    );
}