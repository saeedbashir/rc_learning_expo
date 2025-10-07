// startup.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import Styles from './styles/startup.styles';

const StartupScreen = () => {
  const router = useRouter();

  return (
    <Styles.Container>
      <Styles.Logo source={{ uri: 'https://img.icons8.com/color/96/clapperboard.png' }} />
      <Styles.Title>Welcome to MovieZone</Styles.Title>
      <Styles.Subtitle>Your favorite movies in one place</Styles.Subtitle>

      <Styles.SocialButton>
        <Styles.SocialText>Continue with Google</Styles.SocialText>
      </Styles.SocialButton>

      <Styles.SocialButton>
        <Styles.SocialText>Continue with Apple</Styles.SocialText>
      </Styles.SocialButton>

      <Styles.DividerContainer>
        <Styles.Line />
        <Styles.DividerText>OR</Styles.DividerText>
        <Styles.Line />
      </Styles.DividerContainer>

      <Styles.MainButton onPress={() => router.push('/(auth)/signin')}>
        <Styles.MainButtonText>Sign In</Styles.MainButtonText>
      </Styles.MainButton>

      <Styles.SignupRow>
        <Styles.SignupText>Don’t have an account?</Styles.SignupText>
        <Styles.SignupLink onPress={() => router.push('/(auth)/signup')}>
          <Styles.SignupLinkText>Sign Up</Styles.SignupLinkText>
        </Styles.SignupLink>
      </Styles.SignupRow>

      <Styles.Privacy>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Styles.Privacy>
    </Styles.Container>
  );
};

export default StartupScreen;
