import {types} from "../types/types";

// Inicializo el state vacío
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                // id del usuario que me dvuelve Firebase
                uid: action.payload.uid,
                name: action.payload.displayName
            };
        case types.logout:
            return {};

        default:
            // Reestablece el objeto a un objeto vacío
            return state;
    }
};
