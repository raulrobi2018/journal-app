import firebase from "firebase/app";
// Habilita todas las funcionalidades de Firestore
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCfrF1FhmSgIXuPbCvcbaLyjS6ofLuzlkI",
    authDomain: "journal-app-e2382.firebaseapp.com",
    projectId: "journal-app-e2382",
    storageBucket: "journal-app-e2382.appspot.com",
    messagingSenderId: "473744528004",
    appId: "1:473744528004:web:64bac7fa99adfb0d82a8d1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("Firebase configurado");

//Obtengo la referencia a la base de datos
const db = firebase.firestore();
// Necesario para hacer autentificación con Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Exporto la base de datos para utilizarla en otros archivos para
//realizar tareas en la base de datos
export {db, googleAuthProvider, firebase};
