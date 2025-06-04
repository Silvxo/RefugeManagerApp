// app/(tabs)/_layout.tsx
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
      headerShown: false,
      contentStyle: {
        paddingTop: 24, // ou o valor desejado
        },
        }}
    />
  );
}
