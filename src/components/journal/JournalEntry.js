import React from "react";

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: "cover",
                    backgroundImage:
                        "url(https://www.gettyimages.es/gi-resources/images/frontdoor/editorial/Velo/GettyImages-Velo-1088643550.jpg)"
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Camino a una nueva victoria
                </p>
                <p className="journal__entry-content">
                    Se viene otra etapa definitoria
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>10</h4>
            </div>
        </div>
    );
};
