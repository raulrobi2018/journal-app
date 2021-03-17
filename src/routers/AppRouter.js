import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import {JournalScreen} from "../components/journal/JournalScreen";
import {AuthRouter} from "./AuthRouter";
import {firebase} from "../firebase/firebase-config";
import {useDispatch} from "react-redux";
import {login} from "../actions/auth";

export const AppRouter = () => {
    const dispatch = useDispatch();

    // Cuando el estado de la autentificación en Firebase cambie, se ejecuta esta función
    //El useEffect solo se ejecutará 1 vez porque el dispatch pasado como dependencia
    //no cambia
    useEffect(() => {
        //Esta función regresa un observable que se disparará cada vez que la autenticación cambie
        firebase.auth().onAuthStateChanged((user) => {
            //El signo "?" evalúa si user tiene algo entonces pide el uid
            //O sea que si el uid no existe o si es null, entonces no hace nada
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
            }
        });
    }, [dispatch]);

    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
         renders the first one that matches the current URL. */}
                <Switch>
                    {/* exact para que machee la ruta exacta */}
                    <Route path="/auth" component={AuthRouter} />
                    <Route path="/" component={JournalScreen} />

                    {/* Si no encuentra ningún path, lo redirige a marvel */}
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};
