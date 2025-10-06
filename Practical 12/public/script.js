document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationBtns = document.querySelectorAll('.operation-btn');
    const selectedOperationInput = document.getElementById('selectedOperation');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const errorSection = document.getElementById('error');
    const errorContent = document.getElementById('errorContent');

    let selectedOperation = '';

    // Operation button click handlers
    operationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons
            operationBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Store selected operation
            selectedOperation = this.dataset.operation;
            selectedOperationInput.value = selectedOperation;
            
            // Enable calculate button if both numbers are entered
            checkFormValidity();
            
            // Add fun sound effect (visual feedback)
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
        });
    });

    // Input validation and form state management
    function checkFormValidity() {
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();
        
        if (num1 && num2 && selectedOperation) {
            calculateBtn.disabled = false;
            calculateBtn.textContent = '🎯 Calculate!';
        } else {
            calculateBtn.disabled = true;
            calculateBtn.textContent = '🎯 Calculate!';
        }
    }

    // Input event listeners
    num1Input.addEventListener('input', checkFormValidity);
    num2Input.addEventListener('input', checkFormValidity);

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();
        
        // Clear previous results
        hideResults();
        
        // Show loading state
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<span class="loading"></span> Calculating...';
        
        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num1: num1,
                    num2: num2,
                    operation: selectedOperation
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showResult(data);
            } else {
                showError(data.error);
            }
        } catch (error) {
            showError('Oops! Something went wrong. Please try again!');
        } finally {
            // Reset button state
            calculateBtn.disabled = false;
            calculateBtn.textContent = '🎯 Calculate!';
        }
    });

    // Display result
    function showResult(data) {
        const operationSymbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        
        const operationNames = {
            'add': 'Addition',
            'subtract': 'Subtraction',
            'multiply': 'Multiplication',
            'divide': 'Division'
        };
        
        const symbol = operationSymbols[data.operation];
        const operationName = operationNames[data.operation];
        
        resultContent.innerHTML = `
            <h3>🎉 Great Job! Here's Your Answer:</h3>
            <div style="font-size: 2rem; margin: 15px 0;">
                ${data.num1} ${symbol} ${data.num2} = <strong>${data.result}</strong>
            </div>
            <p>You just did ${operationName}! 🌟</p>
        `;
        
        resultSection.style.display = 'block';
        
        // Add celebration animation
        resultSection.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
            resultSection.style.animation = '';
        }, 600);
    }

    // Display error
    function showError(message) {
        errorContent.innerHTML = `
            <h3>🤔 Oops! Let's Try Again:</h3>
            <p>${message}</p>
        `;
        
        errorSection.style.display = 'block';
    }

    // Hide all result sections
    function hideResults() {
        resultSection.style.display = 'none';
        errorSection.style.display = 'none';
    }

    // Add fun input validation with real-time feedback
    function validateNumberInput(input) {
        const value = input.value;
        const isValid = /^[0-9]*\.?[0-9]*$/.test(value);
        
        if (value && !isValid) {
            input.style.borderColor = '#ff6b6b';
            input.style.backgroundColor = '#fff5f5';
        } else {
            input.style.borderColor = '#e0e0e0';
            input.style.backgroundColor = 'white';
        }
        
        return isValid;
    }

    // Add input validation listeners
    num1Input.addEventListener('input', function() {
        validateNumberInput(this);
    });
    
    num2Input.addEventListener('input', function() {
        validateNumberInput(this);
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to calculate
        if (e.key === 'Enter' && !calculateBtn.disabled) {
            form.dispatchEvent(new Event('submit'));
        }
        
        // Number keys for quick operation selection
        if (e.key >= '1' && e.key <= '4') {
            const operationMap = {
                '1': 'add',
                '2': 'subtract', 
                '3': 'multiply',
                '4': 'divide'
            };
            
            const operation = operationMap[e.key];
            if (operation) {
                const btn = document.querySelector(`[data-operation="${operation}"]`);
                if (btn) {
                    btn.click();
                }
            }
        }
    });

    // Add fun hover effects for fact cards
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add confetti effect for successful calculations
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffeaa7', '#667eea'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Add fall animation for confetti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Trigger confetti on successful calculation
    const originalShowResult = showResult;
    showResult = function(data) {
        originalShowResult(data);
        createConfetti();
    };

    // Initialize form state
    checkFormValidity();
});

