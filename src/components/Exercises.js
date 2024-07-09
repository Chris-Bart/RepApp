// src/components/Exercises.js
import React, { useState } from 'react';
import './Exercises.css';

const Exercises = () => {
    const [exercises, setExercises] = useState([
        'Bankdrücken', 
        'Schrägbankdrücken (Langhantel)', 
        'Schrägbankdrücken (Kurzhantel)', 
        'Schulterdrücken', 
        'Klimmzüge (Obergriff)', 
        'Klimmzüge (Untergriff)', 
        'Latzug', 
        'Rudern (Kabelzug)', 
        'Rudern (Langhantel)', 
        'Kniebeugen', 
        'Kreuzheben', 
        'Skater Squad'
    ]);
    const [newExercise, setNewExercise] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');

    const addExercise = () => {
        if (newExercise.trim()) {
            setExercises([...exercises, newExercise]);
            setNewExercise('');
        }
    };

    const startEdit = (index, name) => {
        setEditIndex(index);
        setEditName(name);
    };

    const saveEdit = () => {
        const updatedExercises = exercises.map((exercise, index) =>
            index === editIndex ? editName : exercise
        );
        setExercises(updatedExercises);
        setEditIndex(null);
        setEditName('');
    };

    const removeExercise = (index) => {
        const updatedExercises = exercises.filter((_, i) => i !== index);
        setExercises(updatedExercises);
    };

    return (
        <div className="container">
            <header>
                <h1>Exercise List</h1>
            </header>
            <main>
                <section id="exercise-section">
                    <input 
                        type="text" 
                        placeholder="New Exercise" 
                        value={newExercise} 
                        onChange={(e) => setNewExercise(e.target.value)} 
                    />
                    <button onClick={addExercise}>Add Exercise</button>
                    <ul>
                        {exercises.map((exercise, index) => (
                            <li key={index}>
                                <span onClick={() => startEdit(index, exercise)}>
                                    {exercise}
                                </span>
                                {editIndex === index && (
                                    <div className="edit-popup">
                                        <input 
                                            type="text" 
                                            value={editName} 
                                            onChange={(e) => setEditName(e.target.value)} 
                                        />
                                        <button onClick={saveEdit}>✔️</button>
                                        <button onClick={() => removeExercise(index)}>❌</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Exercises;
