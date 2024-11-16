import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Remove o cabeçalho padrão
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
    </Stack>
  );
}
