// src/components/ExercisePopup.js
import React from 'react';
import './ExercisePopup.css';

const ExercisePopup = ({ savedExercises, addExercise, setShowPopup }) => {
    return (
        <div className="popup-container">
            <div className="popup">
                <h2>Select Exercise</h2>
                <ul>
                    {savedExercises.map((exercise, index) => (
                        <li key={index}>
                            <button onClick={() => addExercise(exercise)}>{exercise}</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
        </div>
    );
};

export default ExercisePopup;
