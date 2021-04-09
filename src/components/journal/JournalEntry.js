import React from "react";
import moment from "moment";
import {activeNote} from "../../actions/notes";
import {useDispatch} from "react-redux";

export const JournalEntry = ({id, note}) => {
    const noteDate = moment(note.date);

    const dispatch = useDispatch();

    const handleActive = () => {
        dispatch(activeNote(id, note));
    };

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={handleActive}
        >
            {note.url && (
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${note.url})`
                    }}
                ></div>
            )}

            <div className="journal__entry-body">
                <p className="journal__entry-title">{note.title}</p>
                <p className="journal__entry-content">{note.body}</p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format("dddd")}</span>
                <h4>{noteDate.format("Do")}</h4>
            </div>
        </div>
    );
};
