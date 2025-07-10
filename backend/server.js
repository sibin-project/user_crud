const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8feb25',
  database: 'crud_app'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
// add data to db
app.post('/postusers', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  db.query(
    'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database insert failed' });
      }
      res.status(201).json({ message: 'User added successfully', id: result.insertId });
    }
  );
});
//edit
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  db.query(
    'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update user' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});
//del

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});