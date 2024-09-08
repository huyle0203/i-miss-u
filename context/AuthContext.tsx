'use client'
import { auth, db } from '@/firebase'
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from 'firebase/auth'
import { doc, getDoc, DocumentData } from 'firebase/firestore'
import React, { useContext, useState, useEffect, ReactNode } from 'react'

// Define the shape of your auth context value
interface AuthContextType {
  currentUser: User | null
  userDataObj: DocumentData | null
  setUserDataObj: React.Dispatch<React.SetStateAction<DocumentData | null>>
  signup: (email: string, password: string) => Promise<any>
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>
  loading: boolean
}

// Create context with the defined shape
const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userDataObj, setUserDataObj] = useState<DocumentData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // AUTH HANDLERS
  function signup(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(): Promise<void> {
    setUserDataObj(null)
    setCurrentUser(null)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true)
        setCurrentUser(user)

        if (!user) {
          console.log('No User Found')
          return
        }

        // Fetch data from Firestore if user exists
        console.log('Fetching User Data')
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          console.log('Found User Data')
          setUserDataObj(docSnap.data())
        } else {
          setUserDataObj(null)
        }
      } catch (err) {
        console.log((err as Error).message)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    logout,
    login,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
