// src/components/Exercises.js
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const savedExercises = JSON.parse(localStorage.getItem('savedExercises'));
        if (savedExercises) {
            setExercises(savedExercises);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('savedExercises', JSON.stringify(exercises));
    }, [exercises]);

    const [newExercise, setNewExercise] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingExercise, setEditingExercise] = useState('');

    const addExercise = () => {
        if (newExercise.trim() !== '') {
            setExercises([...exercises, newExercise.trim()]);
            setNewExercise('');
        }
    };

    const removeExercise = (index) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingExercise(exercises[index]);
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditingExercise('');
    };

    const saveEdit = (index) => {
        const updatedExercises = exercises.map((exercise, i) => (
            i === index ? editingExercise : exercise
        ));
        setExercises(updatedExercises);
        cancelEdit();
    };

    return (
        <div className="container">
            <header>
                <h1>Exercises</h1>
            </header>
            <main>
                <input
                    type="text"
                    value={newExercise}
                    onChange={(e) => setNewExercise(e.target.value)}
                    placeholder="New Exercise"
                />
                <button onClick={addExercise}>Add Exercise</button>
                <ul>
                    {exercises.map((exercise, index) => (
                        <li key={index}>
                            {editingIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editingExercise}
                                        onChange={(e) => setEditingExercise(e.target.value)}
                                    />
                                    <button onClick={() => saveEdit(index)}>✔️</button>
                                    <button onClick={cancelEdit}>❌</button>
                                </div>
                            ) : (
                                <div>
                                    {exercise}
                                    <button onClick={() => startEditing(index)}>✏️</button>
                                    <button onClick={() => removeExercise(index)}>❌</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default Exercises;
