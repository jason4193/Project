const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'db'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database to find the user
    // const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const query = `SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send(err);
        }

        if (results.length > 0) {
            console.log('Login successful:', results);
            res.status(200).send(results[0]);
        } else {
            res.status(401).send(query + 'Invalid username or password');
        }
    });
});

app.get('/flag/:id', (req, res) => {
    const { id } = req.params;

    // Query the database to get the flag
    const query = `SELECT flag FROM users WHERE id = ${id}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send(err);
        }

        if (results.length > 0) {
            console.log('Flag retrieved:', results);
            res.status(200).send(results[0].flag);
        } else {
            res.status(404).send('Flag not found');
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});