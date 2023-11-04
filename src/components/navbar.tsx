import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { auth, db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { sign } from 'crypto'
type Props = {}

export default function Header({}: Props) {
  const[name, setName] = useState("")
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  useEffect(() => {
    if(!user){
      router.push("/auth/login")
    }else{
      const docSnap = getDoc(doc(db,"users", user.uid))
      docSnap.then((doc:any)=>{
        setName(doc.data().name)
      })
    }
  }, [])
  
  return (
    <main>
         <div className='flex flex-row justify-around content-center text-lg my-5 z-10'>
          <div className='font-semibold text-xl underline'>{name}</div>
          <div className='flex flex-row gap-5'>
          <button
            className="border bg-teal-500 px-6 py-1 rounded-md cursor-pointer text-white"
            onClick={async() => {
              const success = await signOut()
              if(success){
                router.push("/auth/login")
              }
            }}
          >
            LogOut
          </button>
          </div>
        </div>
    </main>
  )
}