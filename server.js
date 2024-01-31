// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
//import fs to read and write files
const fs = require('fs');

//importing uuid to create unique id's
const uuid = require('uuid');
const { type } = require('os');

// initializing unique id variable
var uniqueID = uuid.v4();

// Initialize an instance of Express.js
const app = express();
// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 8080;

// Static middleware pointing to the public folder
app.use(express.static('public'));

// setting route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// setting route for notes.html
app.get('/notes/api', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(dbJson);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
