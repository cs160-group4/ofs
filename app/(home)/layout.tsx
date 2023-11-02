import Footer from '@/app/components/home/Footer'
import Navbar from '@/app/components/home/Navbar'
import '@/app/globals.css'
import { GeistMono, GeistSans } from 'geist/font'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OFS - On-Demand Food Delivery Service',
  description: 'Order food from your OFS groceries.',
  icons: '/favicon.jpg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" data-theme="cupcake" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body >
          <Navbar />
          <main className="min-h-[calc(100vh-299px)] overflow-hidden ">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </>
  )
}
