const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

// Connecting to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check connection
db.connect((err) => {
  if (err) return console.log('Error connecting to mysql');
  console.log('Connected to mysql at id: ', db.threadId);
});

// GET METHOD
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1. Retrieve all patients

// app.get('/data', (req, res) => {
//   // Retrieve data
//   db.query('SELECT * FROM patients', (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Error Retrieving data');
//     } else {
//       res.render('data', { results: results });
//     }
//   });
// });

// For the providers
// Question 2. Retrieve all providers
app.get('/data', (req, res) => {
  // Retrieve data
  db.query(
    'SELECT first_name, last_name, provider_specialty FROM providers;',
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error Retrieving data');
      } else {
        res.render('data', { results: results });
      }
    }
  );
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  console.log('Sending message to the browser');
  app.get('/', (req, res) => {
    res.send('Yes, Server is working');
  });
});
