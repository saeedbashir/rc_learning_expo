import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      {/* hide navbar for startup only */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* other screens keep default headers */}
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  );
};

export default AuthLayout;
