import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {activeNote, deleteNote} from "../../actions/notes";
import {useForm} from "../../hooks/useForm";
import {NotesAppBar} from "./NotesAppBar";

export const NoteScreen = () => {
    const {active: note} = useSelector((state) => state.notes);
    const [formValues, {handleInputChange, reset}] = useForm(note);

    const {body, title} = formValues;

    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}));
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(deleteNote(formValues.id));
    };

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
                    name="title"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                    name="body"
                ></textarea>

                {note.url && (
                    <div className="notes_image">
                        <img src={note.url} alt="Image" />
                    </div>
                )}
            </div>

            <button className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};
