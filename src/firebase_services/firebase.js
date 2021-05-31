import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlXr0d96odBqZGaz2Dadi_W7OnxUBDhoA",
  authDomain: "clone-f364c.firebaseapp.com",
  projectId: "clone-f364c",
  storageBucket: "clone-f364c.appspot.com",
  messagingSenderId: "724797031920",
  appId: "1:724797031920:web:f62cea41aa2849f90a8935",
  measurementId: "G-9Q57WMHB7S",
};

//initializing app
const firebaseApp = firebase.initializeApp(firebaseConfig);
//db initialiation
const db = firebaseApp.firestore();
//auth initialization
const auth = firebase.auth();

export { db, auth };
