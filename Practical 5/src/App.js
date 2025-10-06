import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);
  const inputDivRef = useRef(null);

  // Helper to check if a value is an operator
  const isOperator = (val) => ['/', '*', '+', '-'].includes(val);

  // Helper to remove leading zero from the current number segment
  const sanitizeInput = (prev, value) => {
    // Find the last operator in the string
    const match = prev.match(/([\/+\-*])([^\/+\-*]*)$/);
    let before = '', current = prev;
    if (match) {
      before = prev.slice(0, match.index + 1);
      current = match[2];
    }
    // If current is '0' and value is a digit (not '.'), replace '0' with value
    if (current === '0' && value >= '0' && value <= '9') {
      return before + value;
    }
    // Prevent multiple leading zeros (e.g., 0002)
    if (/^0{2,}/.test(current + value)) {
      return before + value;
    }
    return prev + value;
  };

  // Unified handler for both button and keyboard
  const handleInput = (value) => {
    if (value === 'DEL') {
      setInput((prev) => prev.slice(0, -1));
      setResult('');
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(input);
        setResult(evalResult);
      } catch {
        setResult('Error');
      }
    } else if (isOperator(value)) {
      if (input === '') return; // Don't allow operator at start
      if (isOperator(input[input.length - 1])) {
        // If last char is operator
        if (input[input.length - 1] === value) {
          // Same operator, do nothing
          return;
        } else {
          // Replace last operator with new one
          setInput((prev) => prev.slice(0, -1) + value);
        }
      } else {
        setInput((prev) => prev + value);
      }
      setResult('');
    } else {
      setInput((prev) => sanitizeInput(prev, value));
      setResult('');
    }
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      let key = e.key;
      if (key === 'Enter') key = '=';
      if (key === 'Backspace') key = 'DEL';
      if (key === 'Delete') {
        setInput('');
        setResult('');
        e.preventDefault();
        return;
      }
      if (
        (key >= '0' && key <= '9') ||
        key === '.' ||
        isOperator(key) ||
        key === '=' ||
        key === 'DEL'
      ) {
        e.preventDefault();
        handleInput(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  // Auto-scroll input to the right when input changes
  useEffect(() => {
    if (inputDivRef.current) {
      inputDivRef.current.scrollLeft = inputDivRef.current.scrollWidth;
    }
  }, [input]);

  const buttons = [
    ['/', '*', '+', '-', 'DEL'],
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', '.', '='],
  ];

  return (
    <div className="calculator-container" tabIndex={0} ref={inputRef}>
      <div className="calculator-display">
        <div className="calculator-result">{result !== '' ? result : <span style={{ color: '#888', fontSize: '0.8em' }}>({input === '' ? '0' : input})</span>}</div>
        <div className="calculator-input" ref={inputDivRef}>{input || '0'}</div>
      </div>
      <div className="calculator-buttons">
        {buttons.map((row, i) => (
          <div className="calculator-row" key={i}>
            {row.map((btn) => (
              <button
                key={btn}
                className={`calculator-btn${['/', '*', '+', '-', 'DEL'].includes(btn) ? ' operator' : ''}${btn === '=' ? ' equals' : ''}`}
                onClick={() => handleInput(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
