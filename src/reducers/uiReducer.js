import {types} from "../types/types";

const initialState = {
    loading: false,
    msgError: null
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                // Envío siempre el mismo state pero cambio el error
                ...state,
                msgError: action.payload
            };
            break;
        case types.uiRemoveError:
            return {
                // Envío siempre el mismo state pero cambio el error
                ...state,
                msgError: null
            };
            break;

        default:
            return state;
            break;
    }
};
