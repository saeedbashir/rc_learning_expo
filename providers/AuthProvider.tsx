// providers/AuthProvider.tsx
import { store } from '@/redux/store';
import { tmdbApi } from '@/redux/tmdb';
import { AppUser } from '@/type/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { auth, db } from '../utils/firebaseConfig';

type AuthContextType = {
  user: AppUser | null;
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
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const userSubRef = useRef<(() => void) | null>(null);

  // Load cached user on app startup (before Firebase finishes restoring)
  useEffect(() => {
    const loadCachedUser = async () => {
      try {
        const cached = await AsyncStorage.getItem('user');
        if (cached) setUser(JSON.parse(cached));
      } catch (e) {
        console.warn('Error loading cached user:', e);
      }
    };
    loadCachedUser();
  }, []);

  // Track Firebase auth changes
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        // Clean up previous listener
        if (userSubRef.current) userSubRef.current();

        const userRef = doc(db, 'users', firebaseUser.uid);
        userSubRef.current = onSnapshot(
          userRef,
          async snap => {
            if (!snap.exists()) {
              console.warn('User document not found, creating default');
              const defaultData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email ?? '',
                name: '',
                country: '',
                createdAt: new Date().toISOString(),
              };

              await setDoc(userRef, defaultData);
              setUser(defaultData as unknown as AppUser);
              await AsyncStorage.setItem('user', JSON.stringify(defaultData));
              setLoading(false);
              return;
            }

            const data = snap.data();
            const fullUser: AppUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? '',
              ...(data as Record<string, any>),
            } as AppUser;

            setUser(fullUser);
            await AsyncStorage.setItem('user', JSON.stringify(fullUser));
            setLoading(false);
          },
          err => {
            console.error('Firestore listener error:', err);
            setLoading(false);
          },
        );
      } else {
        // Logged out
        if (userSubRef.current) userSubRef.current();
        userSubRef.current = null;
        setUser(null);
        await AsyncStorage.removeItem('user'); // 🔹 clear cache
        setLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (userSubRef.current) userSubRef.current();
    };
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  // Signup
  const signup = async (
    email: string,
    password: string,
    extraData?: { name?: string; country?: string },
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = cred.user;

    const profileData = {
      uid: newUser.uid,
      email,
      name: extraData?.name ?? '',
      country: extraData?.country ?? '',
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', newUser.uid), profileData);
    await AsyncStorage.setItem('user', JSON.stringify(profileData));
    setUser(profileData as unknown as AppUser);

    return newUser;
  };

  // 🔹 Logout
  const logout = async (): Promise<void> => {
    await signOut(auth);
    await AsyncStorage.removeItem('user');
    setUser(null);
    // Clear RTK Query cache for TMDB
    store.dispatch(tmdbApi.util.resetApiState());
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
