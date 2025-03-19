// Frontend (ReactJS) - Fetch and display weather data
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
        });
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSearch = () => {
        // Convert location to coordinates and fetch weather
        // (This requires an additional API like OpenCage or OpenWeather Geocoding)
    };

    return (
        <div>
            <h1>Weather Forecast</h1>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
            <button onClick={handleSearch}>Search</button>
            {weatherData && (
                <div>
                    <h2>{weatherData.city.name}</h2>
                    <ul>
                        {weatherData.list.slice(0, 5).map((day, index) => (
                            <li key={index}>{day.dt_txt}: {day.main.temp}°C</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
