import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7HtC7snAZCtBcstB_T0gFcV3sWFJPhZM",
  authDomain: "calorie-tracker-a6613.firebaseapp.com",
  projectId: "calorie-tracker-a6613",
  storageBucket: "calorie-tracker-a6613.appspot.com",
  messagingSenderId: "1060423411916",
  appId: "1:1060423411916:web:b65e0b1a2c247c87e7ba69"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const FIREBASE_DB = getFirestore();
export const FIREBASE_AUTH = getAuth(app);
