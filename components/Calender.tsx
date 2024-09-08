'use client'
import React, { useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import { Inter } from 'next/font/google'
import { baseRating, gradients } from '@/utils'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
const inter = Inter({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800'] });

const months: { [key: string]: string } = {
    'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
    'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
    'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
}
const monthsArr: string[] =Object.keys(months)
const now: Date = new Date()
const dayList: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface CalendarProps {
    demo?: boolean;
    completeData?: {
        [year: number]: {
            [month: number]: {
                [day: number]: number;
            };
        };
    };
    handleSetMood?: (day: number, rating: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ demo = false, completeData = {}, handleSetMood }) => {
    const now = new Date()
    const currMonth = now.getMonth()
    const [selectedMonth, setSelectMonth] = useState<string>(Object.keys(months)[currMonth])
    const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear())

    const numericMonth: number = monthsArr.indexOf(selectedMonth)
    const data: { [key: number]: number } = completeData?.[selectedYear]?.[numericMonth] || {}

    function handleIncrementMonth(val: number): void {
        if (numericMonth + val < 0) {
            setSelectedYear(curr => curr - 1)
            setSelectMonth(monthsArr[monthsArr.length - 1])
        } else if (numericMonth + val > 11) {
            setSelectedYear(curr => curr + 1)
            setSelectMonth(monthsArr[0])
        } else {
            setSelectMonth(monthsArr[numericMonth + val])
        }
    }

    //const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1)
    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
    const firstDayOfMonth: number = monthNow.getDay()
    //const daysInMonth: number = new Date(selectedYear, monthsArr.indexOf(selectedMonth) + 1, 0).getDate()
    const daysInMonth: number = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()

    const daysToDisplay: number = firstDayOfMonth + daysInMonth
    const numRows: number = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0)

    return (
        <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-5 gap-4'>
            <button onClick={() => {
                handleIncrementMonth(-1)
            }} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-left"></i></button>
            <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient ' + fugaz.className}>{selectedMonth}, {selectedYear}</p>
            <button onClick={() => {
                handleIncrementMonth(+1)
            }} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-right"></i></button>
        </div>
            <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
                {Array.from(Array(numRows).keys()).map((row, rowIndex) => {
                    return (
                    <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                            let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true
                            let isToday: boolean = dayIndex === now.getDate() && 
                                                     selectedMonth === monthsArr[now.getMonth()] && 
                                                     selectedYear === now.getFullYear()

                                                     if (!dayDisplay) {
                                                        return (
                                                            <div className='bg-white' key={dayOfWeekIndex} />
                                                        )
                                                    }

                            let color: string = demo
                                ? gradients.indigo[baseRating[dayIndex]] :
                                dayIndex in data ?
                                    gradients.indigo[data[dayIndex]] :
                                    'white'

                            // return (
                            //     <div
                            //         style={{ background: color }}
                            //         className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                            //             isToday ? 'border-indigo-400' : 'border-indigo-100'
                            //         } ${color === 'white' ? 'text-indigo-400' : 'text-white'}`}
                            //         key={dayOfWeekIndex}
                            //         onClick={() => handleSetMood && handleSetMood(dayIndex, data[dayIndex] || 0)}
                            //     >
                            //         <p>{dayIndex}</p>
                            //     </div>
                            // )
                            return (
                                <div style={{ background: color }} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' + (isToday ? ' border-indigo-400' : ' border-indigo-100') + (color === 'white' ? ' text-indigo-400' : ' text-white')} key={dayOfWeekIndex}>
                                    <p>{dayIndex}</p>
                                </div>
                            )
                        })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar