import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import {JournalScreen} from "../components/journal/JournalScreen";
import {AuthRouter} from "./AuthRouter";
import {firebase} from "../firebase/firebase-config";
import {useDispatch} from "react-redux";
import {login} from "../actions/auth";
import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";
import {loadNotes} from "../helpers/loadNotes";
import {setNotes, startLoadingNotes} from "../actions/notes";

export const AppRouter = () => {
    const dispatch = useDispatch();

    //Utilizo la variable "checking" con la idea de esperar a que se chequee la autenticación
    //en Firebase. Mientras "checking" sea true no se mostrará nada porque no es seguro si está
    //autenticado o no
    const [checking, setChecking] = useState(true);

    //Utilizo este state para saber si está autenticado o no
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Cuando el estado de la autentificación en Firebase cambie, se ejecuta esta función
    //El useEffect solo se ejecutará 1 vez porque el dispatch pasado como dependencia
    //no cambia
    useEffect(() => {
        //Esta función regresa un observable que se disparará cada vez que la autenticación cambie
        firebase.auth().onAuthStateChanged(async (user) => {
            //El signo "?" evalúa si user tiene algo entonces pide el uid
            //O sea que si el uid no existe o si es null, entonces no hace nada
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return <h1>Please wait...</h1>;
    }

    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
         renders the first one that matches the current URL. */}
                <Switch>
                    {/* exact para que machee la ruta exacta */}
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />
                    {/* <Route path="/auth" component={AuthRouter} />
                    <Route path="/" component={JournalScreen} /> */}

                    {/* Si no encuentra ningún path, lo redirige a marvel */}
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};
