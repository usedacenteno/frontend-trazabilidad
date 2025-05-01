'use client';
import { useLogin } from '@/hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


type FormValues = z.infer<typeof schema>;

export default function LoginPage(){

  const router = useRouter()
    const {mutate: login, isPending,error} = useLogin();
    const {register, handleSubmit,formState:{errors}} = useForm<FormValues>({
        resolver:zodResolver(schema)
    });


    // const onSubmit = (data: FormValues) => {
    //     mutate(data);
    // }
    const onSubmit = (data:FormValues) => {
      login(data, {
        onSuccess: () => {
          // 👇 Redirigir al dashboard
          router.push('/dashboard');
        },
        onError: (err) => {
          console.error('Login failed:', err);
        }
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Encabezado con logo construido con puro CSS */}
          <div className="bg-blue-400 p-6 text-center">
            <div className="flex justify-center mb-3">
              {/* Logo construido con Tailwind - totalmente autónomo */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="relative">
                  {/* Icono de gota (representando suero) */}
                  <div className="w-8 h-10 bg-blue-500 rounded-full transform rotate-45"></div>
                  {/* Detalle de la gota */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Serum Control System</h1>
            <p className="text-blue-100 mt-1">Trazabilidad en tiempo real</p>
          </div>
    
          {/* Formulario */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Iniciar sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="usuario@dominio.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
    
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
    
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-400 focus:ring-blue-300 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordar sesión
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
    
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start">
                  <div className="flex-shrink-0">
                    {/* Ícono de alerta con puro CSS */}
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-2">{error.message}</div>
                </div>
              )}
    
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
                  isPending 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-400 hover:bg-blue-700 shadow-md'
                }`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    {/* Spinner animado con puro CSS */}
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Ingresando...
                  </span>
                ) : 'Ingresar al sistema'}
              </button>
            </form>
    
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    ¿Primera vez en el sistema?
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Solicitar credenciales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}