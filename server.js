// importing required modules for express back end
const express = require('express')
const app = express()
const path = require('path')
const notes = require('./db/db.json')

const PORT = 3001

// setting the root to public
app.use(express.static('public'))

// letting express handle incoming request to receive all the data type
app.use(express.urlencoded({ extended: true }));
// converting incoming request to json to use for req.body
app.use(express.json());

// must create at least 3 back end response
// 1 for get
app.get('/api/notes', (req, res) => {
    // should return notes data from json
    res.json(notes)
})

// the user clicks the get started btn
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

// 1 for post
app.post('/api/notes', (req, res) => {
    // should update the notes and add to the array
    // gets the new note data from the body
    const newNote = req.body

    // saves the new note to the array
    notes.push(newNote)
    res.json(notes)
})

// 1 for delete
app.delete('/api/notes/:id', (req, res) => {
    // should delete the note with id from the array

    // getting the id from parameter
    const {id: noteId} = req.params;
    for(let i = 0; i < notes.length; i++){
        if(noteId == notes[i].id){
            notes.splice(i, 1)
        }
    }
    res.json(notes)

})

// to make it easier to open the server
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))