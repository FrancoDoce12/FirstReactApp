// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLxxbAiZHIz0-od-NRoTmdRaKbO3Arr-w",
    authDomain: "primer-proyecto-fa2e2.firebaseapp.com",
    projectId: "primer-proyecto-fa2e2",
    storageBucket: "primer-proyecto-fa2e2.appspot.com",
    messagingSenderId: "948610062167",
    appId: "1:948610062167:web:0671d97ab4612c3327d012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

function initFirestoreApp() {
    return app
}



export { initFirestoreApp, db, auth }