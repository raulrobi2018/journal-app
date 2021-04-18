import React from "react";
import {RegisterScreen} from "../../../components/auth/RegisterScreen";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import {types} from "../../../types/types";

// jest.mock("../../../actions/auth", () => ({
//     startRegisterWithEmailPasswordName: jest.fn()
// }));

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

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe("Testing RegisterScreen component", () => {
    test("should display the component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should return the error when the email field is empty", () => {
        //Dispara la función handleGoogleLogin
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate("change", {
            target: {
                value: "",
                name: "email"
            }
        });

        //Esto es lo mismo que hacerlo con el .prop("onSubmit")
        wrapper.find("form").simulate("submit", {
            preventDefault() {}
        });

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: "Email is not valid"
        });
    });

    test("should display the error box", () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: "Email is not valid"
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
        expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
            initState.ui.msgError
        );
    });
});
