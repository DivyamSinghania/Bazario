'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  ConfirmationResult,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  uid: string;
  name: string;
  phone: string;
  city: string;
  userType: 'vendor' | 'helper';
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  verifyOTP: (confirmationResult: ConfirmationResult, otp: string, profileData: Omit<UserProfile, 'uid' | 'createdAt'>) => Promise<void>;
  signOut: () => Promise<void>;
  setupRecaptcha: () => RecaptchaVerifier;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user profile
        const profileDoc = await getDoc(doc(db, 'users', user.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data() as UserProfile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setupRecaptcha = () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
    });
    return recaptchaVerifier;
  };

  const signInWithPhone = async (phoneNumber: string) => {
    const recaptchaVerifier = setupRecaptcha();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const verifyOTP = async (
    confirmationResult: ConfirmationResult, 
    otp: string, 
    profileData: Omit<UserProfile, 'uid' | 'createdAt'>
  ) => {
    const result = await confirmationResult.confirm(otp);
    const user = result.user;
    
    // Save user profile to Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      ...profileData,
      createdAt: new Date(),
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    setUserProfile(userProfile);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    user,
    userProfile,
    loading,
    signInWithPhone,
    verifyOTP,
    signOut,
    setupRecaptcha,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}