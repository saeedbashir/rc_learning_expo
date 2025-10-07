import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import * as Yup from 'yup';
import { useAuth } from '../../providers/AuthProvider';
import Styles from './styles/signup.styles';

// Validation Schema
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().min(2, 'Too short!').required('Name is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  country: Yup.string().optional(),
});

const SignupScreen = () => {
  const router = useRouter();
  const { signup } = useAuth();

  const handleSignup = async (values: any) => {
    try {
      await signup(values.email, values.password, {
        name: values.name,
        country: values.country,
      });
      // router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <Styles.Container>
      <Styles.Title>Create Your Account</Styles.Title>
      <Styles.Subtitle>Join MovieZone today</Styles.Subtitle>

      <Formik
        initialValues={{
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          country: '',
        }}
        validationSchema={SignupSchema}
        validateOnBlur
        validateOnChange
        onSubmit={handleSignup}>
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
              Full Name <Styles.Required>*</Styles.Required>
            </Styles.Label>
            <Styles.Input
              placeholder="Enter your full name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && <Styles.ErrorText>{errors.name}</Styles.ErrorText>}

            <Styles.Label>
              Password <Styles.Required>*</Styles.Required>
            </Styles.Label>
            <Styles.Input
              placeholder="Enter password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {touched.password && errors.password && (
              <Styles.ErrorText>{errors.password}</Styles.ErrorText>
            )}

            <Styles.Label>
              Confirm Password <Styles.Required>*</Styles.Required>
            </Styles.Label>
            <Styles.Input
              placeholder="Re-enter password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Styles.ErrorText>{errors.confirmPassword}</Styles.ErrorText>
            )}

            <Styles.Label>Country</Styles.Label>
            <Styles.Input
              placeholder="Enter your country"
              value={values.country}
              onChangeText={handleChange('country')}
              onBlur={handleBlur('country')}
            />

            <Styles.ContinueButton
              disabled={
                !isValid ||
                !values.email ||
                !values.name ||
                !values.password ||
                !values.confirmPassword
              }
              onPress={handleSubmit as any}>
              <Styles.ContinueText>Sign Up</Styles.ContinueText>
            </Styles.ContinueButton>
          </>
        )}
      </Formik>
    </Styles.Container>
  );
};

export default SignupScreen;
