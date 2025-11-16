// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const weatherDisplay = document.getElementById('weather-display');
    const errorMessage = document.getElementById('error-message');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const condition = document.getElementById('condition');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const airQuality = document.getElementById('air-quality');

    // API base URL (provided by user, with key included)
    const apiBaseUrl = 'http://api.weatherapi.com/v1/current.json?key=0ff7558836be4afcaf681857251611&aqi=yes&q=';

    // Function to fetch weather data from the API
    async function fetchWeather(city) {
        try {
            // Build the full API URL with the city
            const url = apiBaseUrl + encodeURIComponent(city);
            // Fetch data from the API
            const response = await fetch(url);
            // Check if the response is OK (status 200)
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            // Parse the JSON response
            const data = await response.json();
            // Return the data
            return data;
        } catch (error) {
            // Throw an error if fetching fails
            throw new Error('Failed to fetch weather data: ' + error.message);
        }
    }

    // Function to display weather data in the HTML
    function displayWeather(data) {
        // Extract data from the API response
        const location = data.location;
        const current = data.current;
        
        // Update the HTML elements with the data
        cityName.textContent = `${location.name}, ${location.country}`;
        temperature.textContent = `Temperature: ${current.temp_c}°C (${current.temp_f}°F)`;
        condition.textContent = `Condition: ${current.condition.text} (Feels like: ${current.feelslike_c}°C)`;
        humidity.textContent = `Humidity: ${current.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${current.wind_kph} km/h (${current.wind_dir})`;
        airQuality.textContent = `Air Quality Index (AQI): ${current.air_quality.pm2_5} (PM2.5)`;
        
        // Show the weather display and hide any error
        weatherDisplay.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    // Function to display error messages
    function displayError(message) {
        // Update the error message text
        errorMessage.textContent = message;
        // Show the error and hide the weather display
        errorMessage.classList.remove('hidden');
        weatherDisplay.classList.add('hidden');
    }

    // Event listener for form submission
    form.addEventListener('submit', async function(event) {
        // Prevent the default form submission (page reload)
        event.preventDefault();
        
        // Get the city name from the input (trim whitespace)
        const city = cityInput.value.trim();
        // If no city is entered, default to London
        if (!city) {
            cityInput.value = 'London';
            return; // Exit to avoid fetching
        }
        
        try {
            // Fetch weather data for the city
            const data = await fetchWeather(city);
            // Display the data
            displayWeather(data);
        } catch (error) {
            // Display the error message
            displayError(error.message);
        }
    });
});