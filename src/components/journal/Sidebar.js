import React from "react";
import {JournalEntries} from "./JournalEntries";
import {useDispatch, useSelector} from "react-redux";
import {startLogout} from "../../actions/auth";
import {startNewNote} from "../../actions/notes";

export const Sidebar = () => {
    //Hook de Redux que retorna el state actual
    //En este caso tomo el atributo ui del state y luego desestructuro el mensaje
    const {name} = useSelector((state) => {
        return state.auth;
    });

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    };

    const handleAddEntry = () => {
        dispatch(startNewNote());
    };

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {name}</span>
                </h3>

                <button className="btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="journal__new-entry" onClick={handleAddEntry}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>

            <JournalEntries />
        </aside>
    );
};
