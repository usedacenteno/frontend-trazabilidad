'use client';
import { useLogin } from '@/hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


type FormValues = z.infer<typeof schema>;

export default function LoginPage(){
    const {mutate, isPending,error} = useLogin();
    const {register, handleSubmit,formState:{errors}} = useForm<FormValues>({
        resolver:zodResolver(schema)
    });


    const onSubmit = (data: FormValues) => {
        mutate(data);
    }

    return (
        <div className="max-w-md mx-auto mt-20">
          <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Correo"
                className="border p-2 w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register('password')}
                type="password"
                placeholder="Contraseña"
                className="border p-2 w-full"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-600">Credenciales incorrectas</p>}
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-4 py-2 w-full"
            >
              {isPending ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      );
}