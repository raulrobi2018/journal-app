import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {
    login,
    logout,
    startLoginEmailPassword,
    startLogout
} from "../../actions/auth";
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

describe("Testing auth.js", () => {
    //Siempre limpio los aciotns que tenga el store
    beforeEach(() => {
        store = mockStore(initState);
    });

    test("Testing login function", () => {
        const uid = "321321";
        const displayName = "Raul";
        const loginAction = login(uid, displayName);
        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });
    });

    test("Testing logout function", () => {
        const logoutAction = logout();
        // console.log(types.logout);
        // console.log(logoutAction);
        expect(logoutAction).toEqual({type: types.logout});
    });

    test("should do the logout correctly", async () => {
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test("should start the startLoginEmailPassword", async () => {
        await store.dispatch(
            startLoginEmailPassword("testing@testing.com", "123456")
        );
        const actions = store.getActions();
        console.log(actions);

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: "thWn3XlIELMDBawrCg1Q5YTDd692",
                displayName: null
            }
        });
    });
});
