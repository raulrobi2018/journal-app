import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import {JournalScreen} from "../components/journal/JournalScreen";
import {AuthRouter} from "./AuthRouter";

export const AppRouter = () => {
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
