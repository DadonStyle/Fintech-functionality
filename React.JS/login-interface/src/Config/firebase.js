import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYwSguSJ5Af6lDg2gxlUc6_Ijz3iAC34w",
  authDomain: "purple-ui.firebaseapp.com",
  projectId: "purple-ui",
  storageBucket: "purple-ui.appspot.com",
  messagingSenderId: "542068921437",
  appId: "1:542068921437:web:a7cc17dbbe43d0fbe1e9b4",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
