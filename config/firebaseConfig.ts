import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: 'expo-workspaces.firebaseapp.com',
  projectId: 'expo-workspaces',
  storageBucket: 'expo-workspaces.firebasestorage.app',
  messagingSenderId: '547565880571',
  appId: '1:547565880571:web:a7740e6663e6571f865c5e',
  measurementId: 'G-QG7V9T0MV4'
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const db = getFirestore(app);
