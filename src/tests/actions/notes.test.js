import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {startNewNote} from "../../actions/notes";

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: "TESTING"
    }
});

describe("Testing notes.js", () => {
    test("should create a new note", async () => {
        // Tiene que ser await porque el startNewNote es asincrona
        await store.dispatch(startNewNote());
    });
});
