import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_API_KEY";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const WeatherApp = () => {
    const [city, setCity] = useState("Delhi");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
            setWeatherData(response.data);
        } catch (err) {
            setError("City not found. Please try again.");
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
            <h1 className="text-3xl font-bold mb-5">Weather Forecast</h1>
            <form onSubmit={handleSearch} className="mb-5">
                <input
                    type="text"
                    placeholder="Enter city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 border border-gray-300 rounded-l-md"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {weatherData && (
                <div className="bg-white p-5 rounded shadow-md">
                    <h2 className="text-xl font-semibold">{weatherData.city.name}</h2>
                    <p className="text-gray-600">5-day Forecast</p>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                        {weatherData.list.slice(0, 5).map((day, index) => (
                            <div key={index} className="p-3 bg-gray-200 rounded">
                                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                                <p>{day.main.temp}°C</p>
                                <p>{day.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
