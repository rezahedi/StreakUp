import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import { Footer, Header, SubHeader } from '@/components/templates';
import { Sidebar } from '@/app/ui';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StreakUp Habits App',
  description: 'The next generation of habit tracking App.',
  icons: '/logo.svg',
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 ${inter.className}`}>
        <Providers>
          <Header />
          <SubHeader />
          <div className='mx-auto lg:max-w-screen-xl px-2.5 lg:px-20'>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-7'>
              <Sidebar />
              {children}
            </div>
          </div>
          <Footer />
        </Providers>
        {modal}
      </body>
    </html>
  )
}
