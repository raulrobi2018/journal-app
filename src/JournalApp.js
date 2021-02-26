import React from "react";
import {AppRouter} from "./routers/AppRouter";

// Este Provider es igual al que utilizamos con el userContext.Provider, el cual
//provee información acerca de la aplicación
import {Provider} from "react-redux";
import {store} from "./store/store";

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};
