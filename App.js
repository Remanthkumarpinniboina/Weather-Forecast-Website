import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return setError("Please enter a city!");
    setError("");

    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.city.name}</h2>
          {weather.list.slice(0, 5).map((day, index) => (
            <div key={index}>
              <p>{day.dt_txt}</p>
              <p>Temp: {day.main.temp}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

