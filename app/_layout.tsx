import { store } from '@/redux/store';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from '../providers/AuthProvider';

function RootNavigator() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log('[RootNavigator] Redirecting to (tabs)');
        router.replace('/(tabs)');
      } else {
        console.log('[RootNavigator] Redirecting to (auth)');
        router.replace('/(auth)');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

  // 👇 Key ensures remount when user flips between null/non-null
  return (
    <Stack key={user ? 'tabs' : 'auth'} screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Provider>
  );
}
