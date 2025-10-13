import { store } from '@/redux/store';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from '../providers/AuthProvider';

function RootNavigator() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const currentGroup = segments[0];
    const inAuthGroup = currentGroup === '(auth)';
    const inTabsGroup = currentGroup === '(tabs)';

    // Avoid redundant redirects
    if (user && inTabsGroup) return;
    if (!user && inAuthGroup) return;

    if (user && inAuthGroup) {
      console.log('[RootNavigator] Redirecting to (tabs)');
      router.replace('/(tabs)');
    } else if (!user && inTabsGroup) {
      console.log('[RootNavigator] Redirecting to (auth)');
      router.replace('/(auth)');
    }
  }, [user?.uid, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
