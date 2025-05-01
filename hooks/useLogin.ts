

import api from "@/lib/api";
import { LoginDto, LoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
// import Cookies from 'js-cookie';


export function useLogin(){
    return useMutation({
        mutationFn: async (data:LoginDto): Promise<LoginResponse> => {
            const res = await api.post('auth/login', data);
            return res.data;
        },
        onSuccess:(data) => {

            setCookie('token', data.access_token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            // Cookies.set('token',data.access_token);
        }
    })
}