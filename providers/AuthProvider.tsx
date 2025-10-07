import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth, db } from '../utils/firebaseConfig';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (
    email: string,
    password: string,
    extraData?: { name?: string; country?: string },
  ) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load cached user on app startup (before Firebase finishes restoring)
  useEffect(() => {
    const loadCachedUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('[AuthProvider] restored user from AsyncStorage:', parsedUser.email);
          setUser(parsedUser);
        }
      } catch (err) {
        console.warn('Error loading cached user:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCachedUser();
  }, []);

  // Track Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        console.log('[AuthProvider] Firebase user active:', firebaseUser.email);
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const profileData = userDoc.exists() ? userDoc.data() : {};
        const fullUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...profileData,
        };
        setUser(fullUser as any);
        await AsyncStorage.setItem('user', JSON.stringify(fullUser)); // 🔹 persist user
      } else {
        setUser(null);
        await AsyncStorage.removeItem('user'); // 🔹 clear cache
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<User> => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));
    const profileData = userDoc.exists() ? userDoc.data() : {};

    const fullUser = {
      uid: userCred.user.uid,
      email: userCred.user.email,
      ...profileData,
    };

    await AsyncStorage.setItem('user', JSON.stringify(fullUser));
    setUser(fullUser as any);
    return userCred.user;
  };

  // 🔹 Signup
  const signup = async (
    email: string,
    password: string,
    extraData?: { name?: string; country?: string },
  ): Promise<User> => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCred.user;

    const profileData = {
      uid: newUser.uid,
      email,
      name: extraData?.name || '',
      country: extraData?.country || '',
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', newUser.uid), profileData);
    await AsyncStorage.setItem('user', JSON.stringify(profileData));
    setUser({ ...newUser, ...profileData } as any);

    return newUser;
  };

  // 🔹 Logout
  const logout = async (): Promise<void> => {
    console.log('[AuthProvider] logging out...');
    await signOut(auth);
    await AsyncStorage.removeItem('user');
    setUser(null);
    console.log('[AuthProvider] user cleared from memory & storage');
  };

  // 🔹 Reset password
  const resetPassword = (email: string): Promise<void> => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
