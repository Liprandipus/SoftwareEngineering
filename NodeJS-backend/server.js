const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); // Parsing JSON data
app.use(cors()); // Using CORS to communicate with our frontend

const db = mysql.createConnection({
    host:  '127.0.0.1',
    user: 'root',
    password: 'Igetthebag987987',
    database: 'LupisBarbershop'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

app.get('/Users', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
