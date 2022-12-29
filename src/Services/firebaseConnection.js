// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU-LSMIGZLb0DIkozAfzbRUoNkFHNtTpI",
  authDomain: "todoapp-f4ba1.firebaseapp.com",
  projectId: "todoapp-f4ba1",
  storageBucket: "todoapp-f4ba1.appspot.com",
  messagingSenderId: "107138383263",
  appId: "1:107138383263:web:3a8e4da761d358fe3fd1aa",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
