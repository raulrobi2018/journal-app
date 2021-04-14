/**
 * @jest-environment node
 */

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {startNewNote} from "../../actions/notes";
import {db} from "../../firebase/firebase-config";
import {types} from "../../types/types";

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: "TESTING"
    }
});

describe("Testing notes.js", () => {
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
});
