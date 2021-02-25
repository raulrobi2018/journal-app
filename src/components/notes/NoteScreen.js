import React from "react";
import {NotesAppBar} from "./NotesAppBar";

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>

                <div className="notes_image">
                    <img
                        src="https://imgd.aeplcdn.com/476x268/bw/ec/15278/Royal-Enfield-Classic-350-Side-87574.jpg?v=201711021421&q=80"
                        alt="Image"
                    />
                </div>
            </div>
        </div>
    );
};
