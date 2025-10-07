//app/(tabs)/settings/index.tsx
import { Link, useRouter } from 'expo-router';
import React from 'react';
import styled from 'styled-components/native';
import { useAuth } from '../../../providers/AuthProvider';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      // router.replace('/(auth)/startup');
    } catch (err: any) {
      console.error('Signout failed:', err.message);
    }
  };

  return (
    <Container>
      <Content>
        <Link href="/settings/profile" asChild>
          <Card>
            <Title>Profile</Title>
            <Desc>View and edit your profile details</Desc>
          </Card>
        </Link>

        <Link href="/settings/details" asChild>
          <Card>
            <Title>Settings</Title>
            <Desc>Manage app preferences</Desc>
          </Card>
        </Link>
      </Content>

      <SignOutButton onPress={handleSignOut}>
        <SignOutText>Sign Out</SignOutText>
      </SignOutButton>
    </Container>
  );
}

/* --- Styled Components --- */

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
  justify-content: space-between;
`;

const Content = styled.View`
  flex-grow: 1;
`;

const Card = styled.TouchableOpacity`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const Desc = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`;

const SignOutButton = styled.TouchableOpacity`
  background-color: #ff4444;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;
`;

const SignOutText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;
