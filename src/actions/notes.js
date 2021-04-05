import {db} from "../firebase/firebase-config";
import {types} from "../types/types";
import {loadNotes} from "../helpers/loadNotes";

export const startNewNote = () => {
    // El segundo parámetro me da acceso al state actual, como lo hace el useSelector
    return async (dispatch, getState) => {
        // También se puede hacer desestructuración
        const uid = getState().auth.uid;

        const entry = {
            title: "",
            body: "",
            date: new Date().getTime(),
            url: ""
        };

        // Grabo el registro en la base de datos
        const doc = await db.collection(`${uid}/journal/Notes`).add(entry);

        dispatch(activeNote(doc.id, entry));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        // Todo lo que viene en la nota
        ...note
    }
});

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const saveNote = (note) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = {...note};

        // Elimino el id de la nota porque en el documento de Firestore no se almacena
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/Notes/${note.id}`).update(noteToFirestore);
    };
};
