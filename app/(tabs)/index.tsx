//app/(tabs)/_layout.tsx
import { Redirect } from 'expo-router';

export default function TabIndex() {
  // Redirecting to home from index as using folders for each tab in the app
  return <Redirect href="/(tabs)/home" />;
}
