import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './components/FooterComponent'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OFS - On-Demand Food Delivery Service',
  description: 'Order food from your favorite restaurants.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>{children}
        <Footer />
       
      </body>
    </html>
  )
}
