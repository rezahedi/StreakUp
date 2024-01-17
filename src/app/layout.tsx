import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";
import { Footer, Header } from '@/components/templates';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StreakUp Habits App',
  description: 'The next generation of habit tracking App.',
  icons: '/logo.svg',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
