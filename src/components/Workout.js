// src/components/Workout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExercisePopup from './ExercisePopup';
import './Workout.css';

const Workout = () => {
    const [exercises, setExercises] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [savedExercises, setSavedExercises] = useState([]);
    const navigate = useNavigate();
    const workoutName = localStorage.getItem('workoutName');

    useEffect(() => {
        if (!workoutName) {
            navigate('/');
        } else {
            const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
            const currentWorkout = savedWorkouts.find(workout => workout.name === workoutName);
            if (currentWorkout) {
                setExercises(currentWorkout.exercises);
            } else {
                setExercises([]);
            }
        }

        const exercises = JSON.parse(localStorage.getItem('savedExercises')) || [];
        setSavedExercises(exercises);
    }, [workoutName, navigate]);

    const addExercise = (exerciseName) => {
        setExercises([...exercises, { name: exerciseName, sets: [{ reps: '', weight: '' }] }]);
        setShowPopup(false);
    };

    const handleExerciseChange = (index, key, value) => {
        const newExercises = exercises.map((exercise, i) => (
            i === index ? { ...exercise, [key]: value } : exercise
        ));
        setExercises(newExercises);
    };

    const handleSetChange = (exerciseIndex, setIndex, key, value) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const newSets = exercise.sets.map((set, j) => (
                    j === setIndex ? { ...set, [key]: value } : set
                ));
                return { ...exercise, sets: newSets };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const addSet = (exerciseIndex) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                return { ...exercise, sets: [...exercise.sets, { reps: '', weight: '' }] };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const removeExercise = (index) => {
        const updatedExercises = exercises.filter((exercise, i) => i !== index);
        setExercises(updatedExercises);
    };

    const saveWorkout = () => {
        const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
        let updatedWorkouts = [...savedWorkouts];

        // Check if the workout name already exists
        const existingWorkout = savedWorkouts.find(workout => workout.name === workoutName);

        if (existingWorkout) {
            // Find the highest counter for this workout name
            let maxCounter = 1;
            savedWorkouts.forEach(workout => {
                const match = workout.name.match(new RegExp(`^${workoutName} (\\d+)$`));
                if (match && parseInt(match[1], 10) > maxCounter) {
                    maxCounter = parseInt(match[1], 10);
                }
            });

            // Increment the counter
            const newWorkoutName = `${workoutName} ${maxCounter + 1}`;
            updatedWorkouts.push({ name: newWorkoutName, exercises });
        } else {
            // If it's a new workout name, just add it
            updatedWorkouts.push({ name: workoutName, exercises });
        }

        localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
        navigate('/');
    };

    return (
        <div className="container">
            <header>
                <h1>Workout: {workoutName}</h1>
                <button className="home-button" onClick={() => navigate('/')}>Home</button>
            </header>
            <main>
                <section id="exercises-section">
                    <button onClick={() => setShowPopup(true)}>Add Exercise</button>
                    <ul id="exercises-list">
                        {exercises.map((exercise, index) => (
                            <li key={index} className="exercise-item">
                                {index > 0 && <hr />} {/* Separator line between exercises */}
                                {exercises.length > 1 && <button onClick={() => removeExercise(index)}>Remove Exercise</button>}
                                <input
                                    type="text"
                                    placeholder="Exercise Name"
                                    value={exercise.name}
                                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                    style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                                />
                                {exercise.sets && exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex} className="set-item">
                                        <input
                                            type="number"
                                            placeholder="Reps"
                                            value={set.reps}
                                            onChange={(e) => handleSetChange(index, setIndex, 'reps', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Weight (kg)"
                                            value={set.weight}
                                            onChange={(e) => handleSetChange(index, setIndex, 'weight', e.target.value)}
                                        />
                                    </div>
                                ))}
                                {exercise.sets && (
                                    <button onClick={() => addSet(index)} style={{ marginTop: '10px' }}>Add Set</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    {exercises.length > 0 && (
                        <button onClick={saveWorkout} style={{ marginTop: '20px' }}>Save Workout</button>
                    )}
                </section>
                {showPopup && <ExercisePopup savedExercises={savedExercises} addExercise={addExercise} setShowPopup={setShowPopup} />}
            </main>
        </div>
    );
};

export default Workout;
