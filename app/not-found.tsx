import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className="text-center space-y-6 mt-10">
      <h2 className="text-3xl font-bold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="text-blue-400" href="/">Return Home</Link>
    </main>
  )
}
