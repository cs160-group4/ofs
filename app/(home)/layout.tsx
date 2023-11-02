import Footer from '@/app/components/home/Footer'
import Navbar from '@/app/components/home/Navbar'
import { GeistSans, GeistMono } from 'geist/font'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'


export const metadata: Metadata = {
  title: 'OFS - On-Demand Food Delivery Service',
  description: 'Order food from your OFS groceries.',
  icons: '/favicon.jpg',
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-299px)] overflow-hidden ">
        {children}
      </main>
      <Footer />

    </>
  )
}
