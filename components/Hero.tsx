import React from 'react'
import { Inter } from "next/font/google";
import Button from './Button';
const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]});
import Calender from './Calender';
import Link from 'next/link';
export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10'>
      <h1 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + inter.className}>
        <span className='textGradient'>I Miss U</span> helps u track your <span className='textGradient'>mood</span> everyday
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl text-center text-slate-500 w-full max-w-[600px] mx-auto'>
        Create a mood record and see how you feel over time on every day of every year.
      </p>
      <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
        <Link href='/dashboard'>
          <Button text='Sign Up' />
        </Link>
        <Link href='/dashboard'>
        <Button text='Log In' dark />
        </Link>
      </div>
      <Calender demo/>
    </div>
  )
}
