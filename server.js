const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await axios.get(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch weather data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
