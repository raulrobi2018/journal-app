import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveNote, startUploading} from "../../actions/notes";

export const NotesAppBar = () => {
    const dispatch = useDispatch();

    const {active} = useSelector((state) => state.notes);

    const handleSave = () => {
        console.log(active);

        dispatch(saveNote(active));
    };

    const handleImageUpload = () => {
        document.querySelector("#file").click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    };

    return (
        <div className="notes_appbar">
            <span>25/02/2021</span>

            <input
                type="file"
                id="file"
                style={{display: "none"}}
                onChange={handleFileChange}
            />

            <div>
                <button className="btn" onClick={handleImageUpload}>
                    Picture
                </button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};
