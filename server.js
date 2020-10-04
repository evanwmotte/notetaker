const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT|| 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});

var array = require("./db/db.json");
const Note = require('./note.js');

app.post('/api/notes', function(req, res) {
    let newNote = new Note (req.body.title, req.body.text);
    array.push(newNote)
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(array), (err) => {});
    res.json(newNote);
});

app.delete('/api/notes/:id', function(req, res) {
    id = parseInt(req.params.id)
    array = array.filter(note => {return note.id !== id})
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(array), (err) => {});
    res.json(array)
});

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
});