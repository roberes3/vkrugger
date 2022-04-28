// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database';

// Configuracion dada por Firebase

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBruEW0AwLrvlifL_TcPbxtEpXqkMacn90",
    authDomain: "vkrugger-87a52.firebaseapp.com",
    databaseURL: "https://vkrugger-87a52-default-rtdb.firebaseio.com",
    projectId: "vkrugger-87a52",
    storageBucket: "vkrugger-87a52.appspot.com",
    messagingSenderId: "726483199455",
    appId: "1:726483199455:web:26c20c08f5794cf31b106a",
    measurementId: "G-Z1L3PWRJTJ"
  };

const app = initializeApp(firebaseConfig);

export default getDatabase(app);
  
  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);