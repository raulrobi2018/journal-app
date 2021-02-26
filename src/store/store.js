import {createStore, combineReducers} from "redux";
import {authReducer} from "../reducers/authReducer";

//El combineReducers se utiliza para crear un reducer que contenga todos los reducers que voy a tener,
// porque el createStore() recibe solo un reducer de parámetro.
// De esta manera cuando tengamos que crear una nueva funcionalidad, simplemente tenemos que añadirlo a
//reducers
const reducers = combineReducers({
    auth: authReducer
});

// Se crea el store donde Redux guardará toda la información
export const store = createStore(
    reducers,
    // Este parámetro es para la configuración del Redux DevTools en las tools del navegador
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
