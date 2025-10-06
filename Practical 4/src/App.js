import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  const incrementFive = () => {
    setCount(count + 5);
  };

  return (
    <div className="App">
      <div className="container">
        {/* Counter Section */}
        <div className="counter-section">
          <h2>Count: {count}</h2>
          <div className="button-group">
            <button onClick={reset}>Reset</button>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={incrementFive}>Increment 5</button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="welcome-section">
          <h1>Welcome to CHARUSAT!!!</h1>
        </div>

        {/* Name Input Section */}
        <div className="name-section">
          <div className="input-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </div>
          <div className="input-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </div>
        </div>

        {/* Name Display Section */}
        <div className="display-section">
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
