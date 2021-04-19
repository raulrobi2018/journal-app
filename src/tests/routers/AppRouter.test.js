import React from "react";
import {AppRouter} from "../../routers/AppRouter";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {firebase} from "../../firebase/firebase-config";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {act} from "@testing-library/react";

import "@testing-library/jest-dom";
import {login} from "../../actions/auth";
// import Swal from "sweetalert2";

// jest.mock("sweetalert2", () => ({
//     fire: jest.fn()
// }));

jest.mock("../../actions/auth", () => ({
    login: jest.fn()
}));

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: "abc"
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Testing AppRouter component", () => {
    test("should run the Login if the user is authenticated", async () => {
        let user;

        await act(async () => {
            const userCred = await firebase
                .auth()
                .signInWithEmailAndPassword("testing@testing.com", "123456");

            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalled();
    });
});
