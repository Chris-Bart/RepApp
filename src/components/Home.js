// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [savedWorkouts, setSavedWorkouts] = useState([]);

    useEffect(() => {
        const workouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
        setSavedWorkouts(workouts);
    }, []);

    const startNewWorkout = () => {
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        localStorage.setItem('workoutName', today);
        navigate('/workout');
    };

    const loadWorkout = (workoutName) => {
        localStorage.setItem('workoutName', workoutName);
        navigate('/workout');
    };

    const removeWorkout = (index) => {
        const updatedWorkouts = [...savedWorkouts];
        updatedWorkouts.splice(index, 1);
        localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
        setSavedWorkouts(updatedWorkouts); // Update state to trigger re-render
    };

    return (
        <div className="container">
            <header>
                <h1>Gym Workout Tracker</h1>
            </header>
            <main>
                <section id="workout-section">
                    <button onClick={startNewWorkout}>Start New Workout</button>
                    <h2>Saved Workouts</h2>
                    <ul>
                        {savedWorkouts.map((workout, index) => (
                            <li key={index}>
                                <button onClick={() => loadWorkout(workout.name)}>
                                    {workout.name}
                                </button>
                                <button onClick={() => removeWorkout(index)} style={{ marginLeft: '10px' }}>X</button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Home;
