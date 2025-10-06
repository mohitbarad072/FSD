import React, { useState } from 'react';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container">
      <button className="menu-btn" onClick={handleSidebarToggle}>
        <span className="menu-icon">&#9776;</span>
      </button>
      {sidebarOpen && (
        <div className={`sidebar open`}>
          <button className="close-btn" onClick={handleSidebarToggle}>&times;</button>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      )}
      <main className={sidebarOpen ? 'shifted' : ''}>
        <h1>Welcome to My Website</h1>
        <p>This is the main content of the webpage.</p>
      </main>
    </div>
  );
}

export default App;
