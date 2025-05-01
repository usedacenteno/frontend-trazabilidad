'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import {  useEffect } from 'react';
import { getCookie  } from 'cookies-next';
import { useLogout } from '@/lib/auth';

export default function DashboardPage(){
    const router = useRouter()
    
    const logout = useLogout()

    useEffect(() => {
        // const token = Cookies.get('token');
        const token = getCookie('token')
        
        if(!token){
            router.push('/login')
        }
    }, []);

    return(
        <div className="p-6">
        <h1 className="text-xl font-bold">Bienvenido al Dashboard</h1>
        <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
          Cerrar sesión
        </button>
      </div>
    )
}