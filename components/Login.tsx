'use client'
import React, { useState } from 'react'
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']});
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const { signup, login } = useAuth();
    async function handleSubmit() {
        if (!email || !password || password.length < 6) {
            return
        }
        setAuthenticating(true)
        try {
            if (isRegister) {
                console.log('Signing up a new user')
                await signup(email, password)
            } else {
                console.log('Logging in existing user')
                await login(email, password)
            }

        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            } else {
                console.log('An unknown error occurred')
            }
        } finally {
            setAuthenticating(false)
        }

    }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
        <h3 className= {'text-4xl sm:text-5xl md:text-6xl ' + inter.className}>{isRegister ? 'Register' : 'Log In'}</h3>
        <p>You&apos;re one step away! </p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className=' w-full max-w-[400px] 
        mx-auto px-3 duration-200 hover:border-blue-600 
        focus:border-blue-600 py-2 sm:py-3 border border-solid
         border-blue-400 rounded-full outline-none ' 
         placeholder='Email'/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} className=' w-full max-w-[400px] 
        mx-auto px-3 duration-200 hover:border-blue-600 
        focus:border-blue-600 py-2 sm:py-3 border border-solid
         border-blue-400 rounded-full outline-none '
         placeholder='Password' type='password'/>
        <div className=' max-w-[400px] w-full mx-auto '>
            <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : "Submit"} full />
        </div>
        <p className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
            <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600'>{isRegister ? 'Sign in' : 'Sign up'}</button></p>
    </div>
  )
}
