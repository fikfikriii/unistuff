import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, initializeFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMR4bUQzMSWEP_P7gqgLqZvHbO06JReQU",
  authDomain: "unistuff-f09c5.firebaseapp.com",
  projectId: "unistuff-f09c5",
  storageBucket: "unistuff-f09c5.appspot.com",
  messagingSenderId: "142408749216",
  appId: "1:142408749216:web:29ac5604359995570079c5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// const db = getFirestore();

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth,db};