import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSSLip9Fv12UNALBLBLYTKlrpDVlWzW3Q",
  authDomain: "fir-auth-test-64579.firebaseapp.com",
  projectId: "fir-auth-test-64579",
  storageBucket: "fir-auth-test-64579.appspot.com",
  messagingSenderId: "938948068877",
  appId: "1:938948068877:web:4d50e9cb6db862903df744",
  measurementId: "G-8TY6M4KS3P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();