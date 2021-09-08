const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBYwSguSJ5Af6lDg2gxlUc6_Ijz3iAC34w",
  authDomain: "purple-ui.firebaseapp.com",
  projectId: "purple-ui",
  storageBucket: "purple-ui.appspot.com",
  messagingSenderId: "542068921437",
  appId: "1:542068921437:web:a7cc17dbbe43d0fbe1e9b4",
};

firebase.initializeApp(firebaseConfig);

//db
const db = firebase.firestore();
//collections
const userCollection = db.collection("Users");

module.exports = userCollection;
