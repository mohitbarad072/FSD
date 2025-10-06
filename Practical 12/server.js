const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Calculator API endpoint
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    
    // Input validation
    if (!num1 || !num2 || !operation) {
        return res.json({
            success: false,
            error: 'Please provide both numbers and select an operation!'
        });
    }
    
    // Check if inputs are valid numbers
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    
    if (isNaN(number1) || isNaN(number2)) {
        return res.json({
            success: false,
            error: 'Please enter valid numbers only!'
        });
    }
    
    let result;
    let error = null;
    
    // Perform calculation based on operation
    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                error = 'Cannot divide by zero!';
            } else {
                result = number1 / number2;
            }
            break;
        default:
            error = 'Invalid operation selected!';
    }
    
    if (error) {
        return res.json({
            success: false,
            error: error
        });
    }
    
    res.json({
        success: true,
        result: result,
        operation: operation,
        num1: number1,
        num2: number2
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Kids Calculator is running on http://localhost:${PORT}`);
    console.log(`✨ Open your browser and start calculating!`);
});

