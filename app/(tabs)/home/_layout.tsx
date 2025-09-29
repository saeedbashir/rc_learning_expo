import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Movies" }} />
      <Stack.Screen name="movie/[id]" options={{ title: "Movie Details" }} />
    </Stack>
  );
}