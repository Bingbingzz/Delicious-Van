// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};

// Initialize Firebase
const myApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(myApp);
export const auth = initializeAuth(myApp, { persistence: getReactNativePersistence(AsyncStorage) })