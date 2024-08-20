import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLU41lQGw-UKlZ7U8CI7QAawudcVw4nPU",
    authDomain: "esorsuadminapp-verification.firebaseapp.com",
    projectId: "esorsuadminapp-verification",
    storageBucket: "esorsuadminapp-verification.appspot.com",
    messagingSenderId: "122059335442",
    appId: "1:122059335442:web:dbd02f305596945d48b5cb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);