import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";

// En este caso este middleware devolverá un callback
//El dispatch lo obtiene de thunk
// En resumen esto es una función que dispara otra función luego que el setTimeout se resuelve
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        dispatch(login(user.uid, user.displayName));
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
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
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
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
      .then(({ user }) => {
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
