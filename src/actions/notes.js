import {db} from "../firebase/firebase-config";

export const startNewNote = () => {
    // El segundo parámetro me da acceso al state actual, como lo hace el useSelector
    return async (dispatch, getState) => {
        // También se puede hacer desestructuración
        const uid = getState().auth.uid;

        const entry = {
            title: "",
            body: "",
            date: new Date().getTime()
        };

        // Grabo el registro en la base de datos
        const doc = await db.collection(`${uid}/journal/Notes`).add(entry);

        console.log(doc);
    };
};
