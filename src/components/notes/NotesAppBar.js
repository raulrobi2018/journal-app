import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveNote} from "../../actions/notes";

export const NotesAppBar = () => {
    const dispatch = useDispatch();

    const {active} = useSelector((state) => state.notes);

    const handleSave = () => {
        console.log(active);

        dispatch(saveNote(active));
    };

    return (
        <div className="notes_appbar">
            <span>25/02/2021</span>
            <div>
                <button className="btn">Picture</button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};
