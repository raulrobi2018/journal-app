import {types} from "../types/types";

// En este caso este middleware devolverá un callback
//El dispatch lo obtiene de thunk
// En resumen esto es una función que dispara otra función luego que el setTimeout se resuelve
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(123, "Raul"));
        }, 3500);
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
