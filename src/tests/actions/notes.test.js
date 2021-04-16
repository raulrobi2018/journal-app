/**
 * @jest-environment node
 */

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {
    startNewNote,
    startLoadingNotes,
    saveNote,
    startUploading
} from "../../actions/notes";
import {db} from "../../firebase/firebase-config";
import {types} from "../../types/types";

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: "TESTING"
    }
};

let store = mockStore(initState);

describe("Testing notes.js", () => {
    //Siempre limpio los aciotns que tenga el store
    beforeEach(() => {
        store = mockStore(initState);
    });

    //Basicamente lo que testea esto es la función startNewNote
    test("should create a new note", async () => {
        // Tiene que ser await porque el startNewNote es asincrona
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        //Luego de grabada la nota se ejecutan los actions activeNote y addNewNoteToList
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
                url: ""
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddEntry,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
                url: ""
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`TESTING/journal/Notes/${docId}`).delete();
    });

    test("startLoadingNotes should load the notes correctly", async () => {
        await store.dispatch(startLoadingNotes("TESTING"));

        const actions = store.getActions();

        //Se esperaría que esta accion sea del tipo notesLoad y el payload de tipo Array
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
            url: expect.any(String)
        };

        //Controlo que los tipos sean los correctos
        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test("should update the note", async () => {
        const note = {
            id: "5zJGClS9DUxz0W0NO2Ko",
            title: "Titulo",
            body: "body"
        };
        await store.dispatch(saveNote(note));

        const actions = store.getActions();
        console.log(actions);

        //Evalúo que sea el mismo type
        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/Notes/${note.id}`).get();

        //Evalúa que tenga el mismo título
        expect(docRef.data().title).toBe(note.title);
    });
});
