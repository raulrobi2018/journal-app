import {types} from "../types/types";
import {firebase, googleAuthProvider} from "../firebase/firebase-config";
import {finishLoading, startLoading} from "./ui";

import Swal from "sweetalert2";

// En este caso este middleware devolverá un callback
//El dispatch lo obtiene de thunk
// En resumen esto es una función que dispara otra función luego que el setTimeout se resuelve
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async ({user}) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch((err) => {
                dispatch(finishLoading());
                Swal.fire("Error", err.message, "error");
            });
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            // De ese objeto extraigo user que es el que tiene la información proveida por
            //la autenticación de Google en Firebase
            .then(async ({user}) => {
                await user.updateProfile({displayName: name});
                dispatch(login(user.uid, user.displayName));
                console.log(user);
            })
            .catch((err) => {
                Swal.fire("Error", err.message, "error");
            });
    };
};

// Login con Google
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            // signInWithPopup devuelve un objeto de tipo UserCredential
            // De ese objeto extraigo user que es el que tiene la información proveida por
            //la autenticación de Google en Firebase
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
            });
    };
};

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    };
};

//Esta es una función asincrona que primero ejecuta el logout en Firebase y espera (await)
//luego actualiza los datos en el store mediante el dispatch
export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
    };
};

export const logout = () => ({
    type: types.logout
});
