// Hardcoded weather data for cities
const weatherData = {
    'ahmedabad': '40°C',
    'mumbai': '32°C',
    'delhi': '35°C',
    'bangalore': '28°C',
    'chennai': '34°C',
    'kolkata': '33°C'
};

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');

// Add click event listener to the button
getWeatherBtn.addEventListener('click', () => {
    // Get the city name and convert to lowercase for case-insensitive comparison
    const city = cityInput.value.toLowerCase().trim();
    
    // Check if the city exists in our data
    if (weatherData.hasOwnProperty(city)) {
        weatherResult.textContent = `The weather in ${city.charAt(0).toUpperCase() + city.slice(1)} is ${weatherData[city]}`;
    } else {
        weatherResult.textContent = 'City not found. Please try another city.';
    }
});

// Add enter key event listener to the input field
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeatherBtn.click();
    }
}); 