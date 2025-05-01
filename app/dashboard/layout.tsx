
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'


export default async function DasboardLayout({children}: {children:React.ReactNode}) {
   const cookieStore = await cookies()
    const token = cookieStore.get('token')
if(!token){
    redirect('/login')
}

    return (
    <>  {children}</>
  )
}