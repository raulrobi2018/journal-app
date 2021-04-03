import React from "react";
import {useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {NotesAppBar} from "./NotesAppBar";

export const NoteScreen = () => {
    const {active: note} = useSelector((state) => state.notes);
    const [formValues, {handleInputChange}] = useForm(note);

    const {body, title} = formValues;

    console.log("body", body);
    console.log("title", title);
    console.log("handle", handleInputChange);

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {note.url && (
                    <div className="notes_image">
                        <img
                            src="https://imgd.aeplcdn.com/476x268/bw/ec/15278/Royal-Enfield-Classic-350-Side-87574.jpg?v=201711021421&q=80"
                            alt="Image"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
