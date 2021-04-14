import firebase from "firebase/app";
// Habilita todas las funcionalidades de Firestore
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

console.log(process.env);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("Firebase configurado correctamente");

//Obtengo la referencia a la base de datos
const db = firebase.firestore();
// Necesario para hacer autentificación con Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Exporto la base de datos para utilizarla en otros archivos para
//realizar tareas en la base de datos
export {db, googleAuthProvider, firebase};
