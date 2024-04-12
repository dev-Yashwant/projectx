const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();
const PORT = 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle incoming data
app.post('/data', (req, res) => {
    console.log('Received data:', req.body);
    res.sendStatus(200); // Respond with OK status
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


