const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = {};
const verificationCodes = {};

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/register', async (req, res) => {
  const { email, password, code } = req.body;

  if (verificationCodes[email] !== code) {
    return res.status(400).json({ message: 'Invalid verification code' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { password: hashedPassword };
  delete verificationCodes[email]; 

  res.status(200).json({ message: 'User registered successfully' });
});

app.post('/send-verification-code', (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  verificationCodes[email] = code;

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is ${code}`
  }, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to send email' });
    res.status(200).json({ message: 'Verification code sent' });
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!users[email]) {
    return res.status(400).json({ message: 'User not found' });
  }

  const user = users[email];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
