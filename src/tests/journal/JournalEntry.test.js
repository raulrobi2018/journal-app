import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import {JournalEntry} from "../../components/journal/JournalEntry";
import {activeNote} from "../../actions/notes";

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

//Reemplaza la funcionalidad del dispatch del store por una función jest
store.dispatch = jest.fn();

const note = {
    id: 10,
    title: "Tremendo día!",
    body: "Hoy es feriado",
    date: 0,
    url: "https://tremendositio.com/dia.jpg"
};

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <JournalEntry id={note.id} note={note} />
        </MemoryRouter>
    </Provider>
);

describe("Testing JournalEntry component", () => {
    test("should display the component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should activate the note", () => {
        wrapper.find(".journal__entry").prop("onClick")();

        //Esta es otra forma de probar la llamada a una función de un componente
        //En este caso llamaría a handleActive
        expect(store.dispatch).toHaveBeenCalled();

        //Evalúo que se ejecute con los parámetros adecuados
        expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, note));
    });
});
