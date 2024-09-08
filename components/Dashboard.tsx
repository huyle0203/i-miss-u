'use client'
import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import Calendar from './Calender';  // Note the correct spelling
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
const inter = Inter({ subsets: ['latin'] })
import Loading from './Loading';
import Login from './Login';


type Moods = {
    '&*@#S': string;
    'Sad': string;
    'Tired': string;
    'Existing': string;
    'Neutral': string;
    'Not bad': string;
    'Happy': string;
    'Excited': string;
    'Crazy': string;
    'Holy ****': string;
};

type MoodData = {
    [year: string]: {
        [month: string]: {
            [day: string]: number
        }
    }
};

const Dashboard: React.FC = () => {
    const {currentUser, userDataObj, setUserDataObj, loading} = useAuth() ?? {};
    const [data, setData] = useState<MoodData>({})
    const now = new Date()

    function countValues() {
        let total_number_of_days = 0
        let sum_moods = 0
        for (let year in data) {
          for (let month in data[year]) {
            for (let day in data[year][month]) {
              let days_mood = data[year][month][day]
              total_number_of_days++
              sum_moods += days_mood
            }
          }
        }
        return { num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days }

    }

    const statuses: { time_remaining: string; num_days: number; average_mood: number } = {
        ...countValues(),
        time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
    }

    async function handleSetMood(mood: number) {
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()

        try {
          const newData = { ...userDataObj }
          if (!newData?.[year]) {
            newData[year] = {}
          }
          if (!newData?.[year]?.[month]) {
            newData[year][month] = {}
          }

          newData[year][month][day] = mood
          // update the current state
          setData(newData)
          // update the global state
          setUserDataObj?.(newData)
          // update firebase
          if (currentUser) {
            const docRef = doc(db, 'users', currentUser.uid)
            const res = await setDoc(docRef, {
              [year]: {
                [month]: {
                  [day]: mood
                }
              }
            }, { merge: true })
          }
        } catch (err: unknown) {
          console.log('Failed to set data: ', err instanceof Error ? err.message : String(err))
        }

    }

    const moods: Moods = {
        '&*@#S': '😭',
        'Sad': '😢',
        'Tired': '🙂‍↕️',
        'Existing': '🫠',
        'Neutral': '😐',
        'Not bad': '🫤',
        'Happy': '😊',
        'Excited': '🥰',
        'Crazy': '🤪',
        'Holy ****': '🤯',
    }


    useEffect(() => {
        if (!currentUser || !userDataObj) {
          return
        }
        setData(userDataObj)
      }, [currentUser, userDataObj])
    
      if (loading) {
        return <Loading />
      }
    
      if (!currentUser) {
        return <Login />
      }
    


    return (
        <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
            <div className='grid grid-cols-3 bg-red-300 textGradient p-4 gap-4 rounded-lg'>
                {Object.keys(statuses).map((status, statusIndex) => (
                    <div key={statusIndex} className='p-4 flex flex-col gap-1 sm:gap-2'>
                        <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
                        <p className={inter.className + ' font-bold text-base sm:text-lg truncate'}>
                            {statuses[status as keyof typeof statuses]}{status === 'num_days' ? ' 🔥' : ''}
                        </p> 
                    </div>
                ))}
            </div>
            <h4 className='text-5xl sm:text-6xl md:text-7xl text-center font-bold'>How do you <span className='textGradient'>feel</span> today?</h4>
            <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
                {Object.keys(moods).map((mood, moodIndex) => {
                    return (
                        <button onClick={() => {
                            const currentMoodValue = moodIndex + 1
                            handleSetMood(currentMoodValue)
                          }} key={moodIndex} className={'p-4 font-bold rounded-2xl blueShadow duration-200 bg-[#5b2bed] hover:bg-[#902df9] text-center flex flex-col items-center justify-center gap-2 ' + (moodIndex === 9 ? 'cols-span-2 sm:cols-span-3 md:cols-span-4' : '')}>
                            <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood as keyof Moods]}</p> 
                            <p className='text-sky-50 text-xs sm:text-sm md:text-base'>{mood}</p>
                        </button>
                    )
                })}
            </div>
            <Calendar completeData={data} handleSetMood={handleSetMood} />
        </div>
    )
}

export default Dashboard