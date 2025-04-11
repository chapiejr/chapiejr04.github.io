const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/process-payment', (req, res) => {
    const { cardholderName, cardNumber, expiry, cvv } = req.body;
    setTimeout(() => {
        res.json({ message: 'Payment processed successfully.' });
    }, 1000);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});