import React from 'react'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]});

export default function Button(props: { text: string, dark?: boolean, full?: boolean }) {
    const { text, dark, full } = props;
  return (
    <button className={' rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-blue-600 ' 
    + `${dark ? '  text-white bg-blue-600 ' : '  text-blue-600 border-slate-200 '} 
    + (full ? ' grid place-items-center w-full ' : '')`}>
      <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + inter.className}>{text}</p>
    </button>
  )
}
