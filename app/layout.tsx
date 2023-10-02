import NavBar from '@/src/components/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MiddleWare from '@/src/components/MiddleWare'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 max-h-screen`}>
        <MiddleWare>
          <NavBar/>
          {children}
        </MiddleWare>
      </body>
    </html>
  )
}
