// app/index.tsx
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    router.replace('/'); // ← isso evita fallback no web, mas você pode usar:
    router.replace('/indexOptions'); // ou para o que você quiser como tela inicial
  }, []);

  return null;
}