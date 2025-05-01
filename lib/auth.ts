'use client';

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export function useLogout(){
    const router = useRouter()
    return () => {
        Cookies.remove('token')
        router.push('/login');
    }
}

 


