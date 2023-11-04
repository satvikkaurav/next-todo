// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhBjNc30cn6zVJgxKCalY28NJ268u9HXs",
  authDomain: "todo-app-62746.firebaseapp.com",
  projectId: "todo-app-62746",
  storageBucket: "todo-app-62746.appspot.com",
  messagingSenderId: "1067342314886",
  appId: "1:1067342314886:web:753ebd00f4115d9c894007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export {db, auth}