'use client';

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";


export function useLogout(){
    const router = useRouter()
    return () => {
        deleteCookie('token')
        router.push('/login');
    }
}

 


