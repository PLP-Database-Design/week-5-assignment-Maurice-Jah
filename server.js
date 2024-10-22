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

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  console.log('Sending message to the browser');
  app.get('/', (req, res) => {
    res.send('Yes, Server is working');
  });
});
