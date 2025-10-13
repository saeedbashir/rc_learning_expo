import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function SettingsLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerRight: () => (
            <Pressable onPress={() => router.push('/(tabs)/settings/editProfile')}>
              <Ionicons name="create-outline" size={22} color="#007bff" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="editProfile" options={{ title: 'Edit Profile' }} />
    </Stack>
  );
}
