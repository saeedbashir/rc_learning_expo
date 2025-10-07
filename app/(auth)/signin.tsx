// app/(auth)/signin.tsx
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import { useAuth } from '../../providers/AuthProvider';
import Styles from './styles/signin.styled';

// Validation Schema
const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

const SignInScreen = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleSignIn = async (values: any) => {
    try {
      await login(values.email, values.password);
      // Alert.alert('Success', 'Signed in successfully!');
      // router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <Styles.Container>
      <Styles.Title>Welcome Back</Styles.Title>
      <Styles.Subtitle>Sign in to continue</Styles.Subtitle>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        validateOnBlur
        validateOnChange
        onSubmit={handleSignIn}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <Styles.Label>
              Email <Styles.Required>*</Styles.Required>
            </Styles.Label>
            <Styles.Input
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && <Styles.ErrorText>{errors.email}</Styles.ErrorText>}

            <Styles.Label>
              Password <Styles.Required>*</Styles.Required>
            </Styles.Label>
            <Styles.Input
              placeholder="Enter your password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && (
              <Styles.ErrorText>{errors.password}</Styles.ErrorText>
            )}

            <Styles.ContinueButton
              disabled={!isValid || !values.email || !values.password}
              onPress={handleSubmit as any}>
              <Styles.ContinueText>Sign In</Styles.ContinueText>
            </Styles.ContinueButton>

            <Styles.SignupLink onPress={() => router.push('/(auth)/signup')}>
              <Styles.SignupText>Don't have an account? Sign up</Styles.SignupText>
            </Styles.SignupLink>
          </>
        )}
      </Formik>
    </Styles.Container>
  );
};

export default SignInScreen;
