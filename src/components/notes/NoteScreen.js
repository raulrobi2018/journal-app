import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {NotesAppBar} from "./NotesAppBar";

export const NoteScreen = () => {
    const {active: note} = useSelector((state) => state.notes);
    const [formValues, {handleInputChange, reset}] = useForm(note);

    const {body, title} = formValues;

    // Cuando se seleccionan diferentes notas en pantalla, los campos no reflejan la información
    // de la nota seleccionada, siempre se mantiene en la primera aunque la nota activa si se actualiza si miramos
    // por devtool de Redux, no se actualiza en nuestro useForm
    // Para solucionar esto se utiliza un useEffect y useRef y además se modifica la función "reset" del useForm
    // Ver video 262 para los detalles de la explicación

    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    // ***********************************************************************

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
