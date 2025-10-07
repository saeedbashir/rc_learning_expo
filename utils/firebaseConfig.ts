// util/firebaseConfig.ts
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase Console credentials
const firebaseConfig = {
  apiKey: 'AIzaSyB39PbnD_c9bniZ5O8b2S8UVQ_1Y88pNfw',
  authDomain: 'rc-learning-expo.firebaseapp.com',
  projectId: 'rc-learning-expo',
  storageBucket: 'rc-learning-expo.appspot.com',
  messagingSenderId: '490457083331',
  appId: '1:490457083331:web:9498690d4097f9631d6176',
};

// Ensure single app instance
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with React Native persistence
let auth: Auth;
if (getApps().length > 0) {
  // If app is already initialized, get the auth instance
  console.log('firebaseConfig: calling get app ');
  auth = getAuth(app);
} else {
  // Otherwise, initialize with persistence
  console.log('firebaseConfig: calling initializeAuth');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// Firestore init
export const db = getFirestore(app);
export { auth };
export default app;
