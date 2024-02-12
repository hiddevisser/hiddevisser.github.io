const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('users.db');

// Create users table if it doesn't exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080' }));

// Rate limiting middleware to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Allow 5 failed attempts
  handler: function (req, res) {
    res.status(429).json({ message: 'Too many failed login attempts. Please try again later.' });
  }
});
app.use('/login', limiter);

// Endpoint for handling login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Find user in the database
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Check if user exists
    if (!row) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Authentication successful
    return res.status(200).json({ message: 'Authentication successful', success: true });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
