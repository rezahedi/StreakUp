// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZUgqTCe5lUGIp7nFkQ2qBbz6mU-sbUVk",
  authDomain: "streakup.firebaseapp.com",
  projectId: "streakup",
  storageBucket: "streakup.appspot.com",
  messagingSenderId: "775496954037",
  appId: "1:775496954037:web:f688dd361efa2896294efc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;