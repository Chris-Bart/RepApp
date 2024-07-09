// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Statistics = () => {
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [savedExercises, setSavedExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');

    useEffect(() => {
        const workouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
        setSavedWorkouts(workouts);

        const exercises = JSON.parse(localStorage.getItem('savedExercises')) || [];
        setSavedExercises(exercises);

        if (exercises.length > 0) {
            setSelectedExercise(exercises[0]);
        }
    }, []);

    const filterWorkouts = () => {
        return savedWorkouts.map(workout => {
            const exerciseData = workout.exercises.find(ex => ex.name === selectedExercise);
            if (exerciseData) {
                const averageWeight = exerciseData.sets.reduce((sum, set) => sum + (parseInt(set.weight) || 0), 0) / exerciseData.sets.length;
                return { name: workout.name, weight: averageWeight };
            }
            return null;
        }).filter(data => data !== null);
    };

    const filteredData = filterWorkouts();

    const data = {
        labels: filteredData.map(item => item.name),
        datasets: [
            {
                label: `Average Weight for ${selectedExercise}`,
                data: filteredData.map(item => item.weight),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Training Statistics',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Workout Name',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Weight (kg)',
                },
            },
        },
    };

    return (
        <div className="container">
            <header>
                <h1>Training Statistics</h1>
            </header>
            <main>
                <div className="filter-container">
                    <label htmlFor="exercise-select">Select Exercise: </label>
                    <select
                        id="exercise-select"
                        value={selectedExercise}
                        onChange={(e) => setSelectedExercise(e.target.value)}
                    >
                        {savedExercises.map((exercise, index) => (
                            <option key={index} value={exercise}>
                                {exercise}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="chart-container">
                    <Line data={data} options={options} />
                </div>
            </main>
        </div>
    );
};

export default Statistics;
