import {types} from "../types/types";

const initialState = {
    notes: [],
    active: null
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                //Siempre hay que retornar el state actual y luego lo que se quiere modificar
                ...state,
                active: {
                    ...action.payload
                }
            };

        case types.notesAddEntry:
            return {
                ...state,
                // Inserta la nueva nota la principio y le agrega las existentes
                notes: [action.payload, ...state.notes]
            };

        case types.notesLoad:
            return {
                ...state,
                // Exparso con el operador spread porque esto es un array
                notes: [...action.payload]
            };

        case types.notesUpdated:
            return {
                ...state,
                // Busca la nota con el mismo id que viene en el payload y retorna la nota del payload
                // El id y nota del payload son los pasados en la función refreshListNotes del notes.js
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload.note : note
                )
            };

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter((n) => n.id !== action.payload)
            };

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            };

        default:
            return state;
    }
};
