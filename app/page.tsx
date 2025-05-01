

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirige automáticamente al login
  }, []);

  return null; // No se muestra nada
}
