const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins (Allow requests from localhost:3000)
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.post('/tts', (req, res) => {
    res.json({ message: 'CORS issue resolved!' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
