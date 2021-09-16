const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

// Create a movie
app.post('/api/new-movies', ({ body }, res) => {
  const sql = `INSERT INTO movies (title) VALUES (?)`;
  const newMovie = body;
  
  db.query(sql, newMovie, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Read all movies
app.get('/api/movies', (req, res) => {
  const sql = `SELECT * FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// TODO: Delete a movie
app.delete('/api/movies/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?;`;
  const returnedId = req.params.id
  console.log(returnedId);
  
  db.query(sql, returnedId, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'successfully Updated',
      data: rows
    });
  });
});

// TODO: Read list of all reviews and associated movie name using LEFT JOIN
app.get('/api/movies_reviews', (req, res) => {
  const sql = `SELECT movies.title AS Title, reviews.review AS Reviews FROM reviews JOIN movies ON reviews.movies_id = movies.id;`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// TODO: Update review name
app.put('/api/reviews', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const {review, id} = req.body;
  let array = [review, id];
  console.log(review);
  console.log(id);
  
  db.query(sql, array, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
