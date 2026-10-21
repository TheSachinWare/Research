import React, { useState } from 'react';
import './App.css'; // Import the CSS for styles

function App() {
    const [query, setQuery] = useState('');
    const [prediction, setPrediction] = useState('');

    const handlePredict = async () => {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const result = await response.json();
        setPrediction(result.Prediction);
    };

    return (
        <div className="App">
            <h1>SQL Injection Detection</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter SQL query"
            />
            <button onClick={handlePredict}>Predict</button>
            {prediction !== '' && (
                <div className={`prediction ${prediction === 1 ? 'alert' : 'safe'}`}>
                    <p>Prediction: {prediction === 1 ? 'Malicious' : 'Safe'}</p>
                </div>
            )}
        </div>
    );
}

export default App;
