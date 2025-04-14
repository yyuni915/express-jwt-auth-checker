require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { authToken } = require('./middleware/token');
const db = require('./db/connection');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Load credentials from .env or use default
const port = process.env.PORT || 3000; 

// Load credentials from .env or use default
const VALID_USER = process.env.ADMIN_USER || 'guest';
const VALID_PASS = process.env.ADMIN_PASS || '1234';

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  if (username === VALID_USER && password === VALID_PASS) {
    const accessToken = jwt.sign({ username }, 'secretKey', { expiresIn: '1d' });
    res.status(201).send(accessToken);
  } else {
    res.status(401).send('Login failed. Invalid credentials.');
  }
});

app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

app.get('/status', authToken, (req, res) => {
  if (!req.username) return res.status(401).send('Unauthorized');

  try {
    db.query('SELECT 1', (err) => {
      if (err) {
        return res.status(200).send({ isLogin: true, isConnectedToDatabase: false });
      }
      return res.status(200).send({ isLogin: true, isConnectedToDatabase: true });
    });
  } catch {
    return res.status(200).send({ isLogin: true, isConnectedToDatabase: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
