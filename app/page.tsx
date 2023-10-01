import AuthMiddleWare from '@/src/components/AuthMiddleWare'

export default function Home() {
  return (
    <AuthMiddleWare>
      <main className="flex h-full flex-col">
        <div>
          <h1>Hello World</h1>
        </div>
      </main>
    </AuthMiddleWare>
  )
}
