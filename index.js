const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   
    password: 'password',
    database: 'userdata'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Secret key for JWT
const JWT_SECRET = 'my_secret_key';

// Register a new user
app.post('/signUP', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).send('All fields are required');
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result.length) return res.status(400).send('User already exists');

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
            [username, hashedPassword, email], 
            (err, result) => {
                if (err) throw err;
                res.status(201).send('User registered');
        });
    });
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Check user credentials
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) return res.status(400).send('User not found');

        const user = result[0];

        // Compare password with hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        // Generate JWT
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
});

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

app.get('/dashboard', authenticateJWT, (req, res) => {
    res.send(`Welcome ${req.user.username}, to your dashboard`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

