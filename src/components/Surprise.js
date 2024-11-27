import React from 'react';
import './Surprise.css'; // Import file CSS untuk style

const Surprise = () => {
    return (
        <div className="cake">
            <div className="velas">
                <div className="fuego"></div>
                <div className="fuego"></div>
                <div className="fuego"></div>
                <div className="fuego"></div>
                <div className="fuego"></div>
            </div>
            <div className="cobertura"></div>
            <div className="bizcocho"></div>
            <h1 className="unique-header">happy b'day</h1>
            <p className="unique-paragraph">Ifin Tupai</p>

            <audio autoPlay loop>
                <source src="Taylor Swift - 22.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Surprise;
