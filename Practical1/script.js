// Initialize votes object
const votes = {
    javascript: 0,
    python: 0,
    java: 0
};

// Function to update vote counts in the UI
function updateVotes() {
    for (const language in votes) {
        const element = document.getElementById(`${language}-votes`);
        if (element) {
            element.textContent = votes[language];
        }
    }
}

// Function to handle voting
function vote(language) {
    if (language in votes) {
        votes[language]++;
        updateVotes();
        
        // Add animation effect to the voted button
        const btn = document.querySelector(`button[onclick="vote('${language}')"]`);
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    }
}

// Simulate real-time updates
setInterval(() => {
    // Randomly select a language
    const languages = Object.keys(votes);
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    
    // Randomly increment votes (0 to 2 votes at a time)
    const increment = Math.floor(Math.random() * 1);
    votes[randomLanguage] += increment;
    
    // Update the display
    updateVotes();
}, 2000);

// Initial update of vote counts
updateVotes(); 