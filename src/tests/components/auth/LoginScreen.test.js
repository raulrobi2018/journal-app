import React from "react";
import {LoginScreen} from "../../../components/auth/LoginScreen";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import {startGoogleLogin, startLoginEmailPassword} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);

//Reemplaza la funcionalidad del dispatch del store por una función jest
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe("Testing LoginScreen component", () => {
    //Siempre limpio los aciotns que tenga el store
    beforeEach(() => {
        store = mockStore(initState);
        //Limpia los mocks de jest
        jest.clearAllMocks();
    });

    test("should display the component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should run the startGoogleLogin action", () => {
        //Dispara la función handleGoogleLogin
        wrapper.find(".google-btn").prop("onClick")();

        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test("should run the startLogin with its respectively params", () => {
        //Dispara la función
        wrapper.find("form").prop("onSubmit")({preventDefault() {}});

        expect(startLoginEmailPassword).toHaveBeenCalledWith("", "");
    });
});
