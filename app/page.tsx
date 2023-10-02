import AuthMw from '@/src/components/AuthMw';

export default function Home() {
  return (
    <AuthMw>
      <main className="flex h-full flex-col">
        <div>
          <h1>Hello World</h1>
        </div>
      </main>
    </AuthMw>
  )
}
