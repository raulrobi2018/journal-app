/**
 * Se crea un nuevo archivo para correr estos test porque
 * la configuración del enviroment en node del otro archivo hace
 * que falle el new File()
 */

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {startUploading} from "../../actions/notes";
import {db} from "../../firebase/firebase-config";
import {fileUpload} from "../../helpers/fileUpload";
import {types} from "../../types/types";

jest.mock("../../helpers/fileUpload", () => ({
    fileUpload: jest.fn(() => {
        return "https://hola-mundo.com/cosa.jpg";
    })
}));

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//Necesario por fallo de scrollTo del fileupload
global.scrollTo = jest.fn();

const initState = {
    auth: {
        uid: "TESTING"
    },
    notes: {
        active: {
            id: "5zJGClS9DUxz0W0NO2Ko",
            title: "Hola",
            body: "Raul Rodriguez"
        }
    }
};

let store = mockStore(initState);

describe("Testing notes.js", () => {
    //Siempre limpio los aciotns que tenga el store
    beforeEach(() => {
        store = mockStore(initState);
    });

    test("should upload the entry's url", async () => {
        let file = new File([], "image.jpg");

        await store.dispatch(startUploading(file));

        const docRef = await db
            .doc("/TESTING/journal/Notes/5zJGClS9DUxz0W0NO2Ko")
            .get();
        expect(docRef.data().url).toBe("https://hola-mundo.com/cosa.jpg");
    });
});
