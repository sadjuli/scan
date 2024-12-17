import { Inter } from 'next/font/google'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import "./globals.css"
import { AuthProvider } from '@/context/AuthContext'
import { SearchProvider } from '@/context/SearchContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  title: "SCAN"
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" className={inter.className}>
        <body>
          <Header></Header>
          <SearchProvider>
            <div className="wrapper">{ children }</div>
          </SearchProvider>
          <Footer></Footer>
        </body>
      </html>
    </AuthProvider>
  );
}
