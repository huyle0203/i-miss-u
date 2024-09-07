import React from 'react'
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']});
import Button from './Button';
export default function Login() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
        <h3 className= {'text-4xl sm:text-5xl md:text-6xl ' + inter.className}>Log In / Register</h3>
        <p>You&apos;re one step away! </p>
        <input className=' w-full max-w-[400px] 
        mx-auto px-3 duration-200 hover:border-blue-600 
        focus:border-blue-600 py-2 sm:py-3 border border-solid
         border-blue-400 rounded-full outline-none ' 
         placeholder='Email'/>
        <input className=' w-full max-w-[400px] 
        mx-auto px-3 duration-200 hover:border-blue-600 
        focus:border-blue-600 py-2 sm:py-3 border border-solid
         border-blue-400 rounded-full outline-none '
         placeholder='Password' type='password'/>
        <div className=' max-w-[400px] w-full mx-auto '>
            <Button text='Submit' full/>
        </div>
        <p className='text-center'>Dont have an account? <span className='text-blue-600'>Sign Up</span></p>
    </div>
  )
}
