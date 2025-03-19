// Backend (Node.js) - Fetch weather data without Express
const http = require('http');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if (url.pathname === '/weather' && url.searchParams.has('lat') && url.searchParams.has('lon')) {
        const lat = url.searchParams.get('lat');
        const lon = url.searchParams.get('lon');
        
        try {
            const response = await axios.get(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify(response.data));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ error: 'Failed to fetch weather data' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
