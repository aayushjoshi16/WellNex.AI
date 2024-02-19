const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set up a static directory to serve HTML, CSS, and other files
app.use(express.static(path.join(__dirname, '..', 'app')));

const pool = new Pool({
  user: 'your-db-user',
  host: 'localhost',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 5432,
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'app', 'login.html'));
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database for a user with the provided username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && user.password === password) { // In a real application, use a password hashing function!
      res.status(200).send({ message: 'Sign in successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred' });
  }
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
