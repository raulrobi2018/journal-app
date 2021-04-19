import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import {startLogout} from "../../actions/auth";
import {Sidebar} from "../../components/journal/Sidebar";
import {startNewNote} from "../../actions/notes";

// jest.mock("sweetalert2", () => ({
//     fire: jest.fn()
// }));

jest.mock("../../actions/auth", () => ({
    startLogout: jest.fn()
}));

jest.mock("../../actions/notes", () => ({
    startNewNote: jest.fn()
}));

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: "1",
        name: "Raul"
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Testing Sidebar component", () => {
    const wrapper = mount(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );

    test("should display the component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should run the startLogout action", () => {
        //Dispara la función handleLogout
        wrapper.find(".btn").prop("onClick")();

        expect(startLogout).toHaveBeenCalled();
    });

    test("should run the startNewNote action", () => {
        //Dispara la función handleAddEntry
        wrapper.find(".journal__new-entry").prop("onClick")();

        expect(startNewNote).toHaveBeenCalled();
    });
});
