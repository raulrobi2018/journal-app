import React from "react";
import {NoteScreen} from "../../../components/notes/NoteScreen";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import {activeNote} from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
    activeNote: jest.fn()
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
        active: {
            id: 1234,
            title: "Hola",
            body: "Raul Rodriguez",
            date: 0,
            url: null
        },
        notes: []
    }
};

let store = mockStore(initState);

//Reemplaza la funcionalidad del dispatch del store por una función jest
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <NoteScreen />
        </MemoryRouter>
    </Provider>
);

describe("Testing NoteScreen component", () => {
    test("should display the component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should run the activeNote function", () => {
        wrapper.find('input[name="title"]').simulate("change", {
            target: {
                name: "title",
                value: "Hola de nuevo"
            }
        });

        //Evalúa que se haya llamdo
        expect(activeNote).toHaveBeenCalled();

        //Evalúa que se haya llamado con los parámetros esperados
        //Se evalúa en la última llamada ya que se ejecuta 2 veces cuando el formulario se carga
        expect(activeNote).toHaveBeenLastCalledWith(1234, {
            body: "Raul Rodriguez",
            title: "Hola de nuevo",
            id: 1234,
            date: 0,
            url: null
        });
    });
});
