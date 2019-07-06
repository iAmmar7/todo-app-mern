const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const todo = require('./routes/api/todo');

const app = express();

// Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect MongoDB
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error " + err));


// Test Routes
app.get('/', (req, res) => res.send("Hello World!"));

// All Routes
app.use('/api/todo', todo);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));