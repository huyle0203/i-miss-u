'use client'

import { auth, db } from '@/firebase'
import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, DocumentData } from 'firebase/firestore'
import React, { useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  currentUser: User | null;
  userDataObj: DocumentData | null;
  setUserDataObj: React.Dispatch<React.SetStateAction<DocumentData | null>>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export function useAuth() {
  //const context = useContext(AuthContext)
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userDataObj, setUserDataObj] = useState<DocumentData | null>(null)
  const [loading, setLoading] = useState(true)

  // AUTH HANDLERS
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    setUserDataObj(null)
    setCurrentUser(null)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // Set the user to our local context state
        setLoading(true)
        setCurrentUser(user)
        if (!user) {
          console.log('No User Found')
          return
        }
        // if user exists, fetch data from firestore database
        console.log('Fetching User Data')
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        let firebaseData: DocumentData = {}
        if (docSnap.exists()) {
          console.log('Found User Data')
          firebaseData = docSnap.data()
          console.log(firebaseData)
        }
        setUserDataObj(firebaseData)
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
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}