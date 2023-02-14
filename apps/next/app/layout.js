import './globals.css'
import Link from 'next/link'

import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'NextJS x New Relic Test',
    template: '%s | Acme',
  },
  description: 'Testing NextJS with New Relic integration',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header id="header">
          <nav className={inter.className}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
