// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Workout from './components/Workout';
import Exercises from './components/Exercises'; // Import the new component
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workout" element={<Workout />} />
                    <Route path="/exercises" element={<Exercises />} /> {/* Add the new route */}
                </Routes>
                <NavBar />
            </div>
        </Router>
    );
}

export default App;
