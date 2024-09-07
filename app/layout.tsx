import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "I Miss U",
  description: "Your fav mood tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const header = (
    <header className='p-4 sm:p-8 flex justify-between items-center gap-4 '>
      <Link href={'/'}>
        <h1 className={'text-base sm:text-lg textGradient font-extrabold' + inter.className}>I Miss U</h1>
      </Link>
      <div className='flex items-center justify-between '>
        PLACEHOLDER
      </div>
      

    </header>
  );

  const footer = (
    <footer className='p-4 sm:p-8 grid place-items-center font-semibold '>
      <p className={'text-blue-200 '+ inter.className}>Created with ❤️</p>
    </footer>
  );

  return (
    <html lang="en">
      <AuthProvider>
      <body
        className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800'  + `${geistSans.variable} ${geistMono.variable} antialiased`}>
        {header}
        {children}
        {footer}
      </body>
      </AuthProvider>
    </html>
    
  );
}
