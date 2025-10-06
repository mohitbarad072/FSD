let count = localStorage.getItem('repCount') 
  ? parseInt(localStorage.getItem('repCount')) 
  : 0;

const counter = document.getElementById('counter');

function updateDisplay() {
  counter.textContent = count;
  localStorage.setItem('repCount', count);
}

function changeCount(amount) {
  count += amount;
  if (count < 0) count = 0;
  updateDisplay();
}

function resetCount() {
  count = 0;
  updateDisplay();
}

updateDisplay();
