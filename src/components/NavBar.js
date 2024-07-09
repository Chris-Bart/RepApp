// src/components/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS for the NavBar

const NavBar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleWorkoutClick = () => {
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
        const todayWorkout = savedWorkouts.find(workout => workout.name === today);

        if (todayWorkout) {
            localStorage.setItem('workoutName', todayWorkout.name);
        } else {
            localStorage.setItem('workoutName', today);
        }
        navigate('/workout');
    };

    const handleExercisesClick = () => {
        navigate('/exercises');
    };

    return (
        <div className="navbar">
            <button className="navbar-button" onClick={handleHomeClick}>Home</button>
            <button className="navbar-button" onClick={handleWorkoutClick}>Workout</button>
            <button className="navbar-button" onClick={handleExercisesClick}>Exercises</button>
        </div>
    );
};

export default NavBar;
