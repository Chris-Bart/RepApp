// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initial saved exercises
const initialExercises = [
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
];

if (!localStorage.getItem('savedExercises')) {
    localStorage.setItem('savedExercises', JSON.stringify(initialExercises));
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
