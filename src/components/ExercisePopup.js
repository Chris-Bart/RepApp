// src/components/ExercisePopup.js
import React from 'react';
import './ExercisePopup.css';

const ExercisePopup = ({ exercises, onSelect, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Select Exercise</h2>
                <ul>
                    {exercises.map((exercise, index) => (
                        <li key={index} onClick={() => onSelect(exercise)}>
                            {exercise}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ExercisePopup;
