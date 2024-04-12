import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/data', async (req, res) => {
    console.log('I am data in Node.js:', req.body);

    try {
        const response = await fetch('http://127.0.0.1:5000/test', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        console.log('Response from Flask:',data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
