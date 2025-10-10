import FullscreenLoader from '@/components/FullscreenLoader';
import { Stack } from 'expo-router';

const HomeStack = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Movies' }} />
        <Stack.Screen name="movie/[id]" options={{ title: 'Movie Details' }} />
      </Stack>
      <FullscreenLoader />
    </>
  );
};

export default HomeStack;
