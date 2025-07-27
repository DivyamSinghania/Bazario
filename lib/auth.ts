import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut, 
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseClient';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  role: 'vendor'|'wholesaler'
  createdAt: Date;
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
  
  
}



const googleProvider = new GoogleAuthProvider();

// const safeRole = role === 'vendor' || role === 'wholesaler' ? role : 'vendor';
export const signUp = async (email: string, password: string, name: string,
  role: 'vendor'|'wholesaler'
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      name,
      role,
      createdAt: new Date(),
      enrolledCourses: [],
      completedCourses: [],
      certificates: []
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user profile exists, if not create one
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        name: user.displayName || 'User',
        role:'vendor',
        createdAt: new Date(),
        enrolledCourses: [],
        completedCourses: [],
        certificates: []
      };
      await setDoc(doc(db, 'users', user.uid), userProfile);
    }
    
    return result;
  } catch (error) {
    throw error;
  }
};

export const setupRecaptcha = (containerId: string) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    }
  });
};

export const signInWithPhone = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> => {
  try {
    return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};