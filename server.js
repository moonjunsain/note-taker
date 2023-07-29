// importing required modules for express back end
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

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
    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if(err) console.log(err)
        else {
            const parsedData = JSON.parse(data)
            res.json(parsedData)
        }
    })
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
    // read the current file
    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if(err) console.log(err)
        else {
            // rewrite the data notes
            const parsedData = JSON.parse(data)
            // add the new notes to the array
            parsedData.push(newNote)
            // rewrite the db with new notes
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err)=>{
                if(err) console.log(err)
                res.json(parsedData)
            })
        }
    })

})

// 1 for delete
app.delete('/api/notes/:id', (req, res) => {
    // should delete the note with id from the array

    // getting the id from parameter
    const {id: noteId} = req.params;

    // read the file to obtain the current data
    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if(err) console.log(err)
        else {
            // rewrite the data notes
            const parsedData = JSON.parse(data)

            // search for the data with id
            for(let i = 0; i < parsedData.length; i++){
                if(noteId == parsedData[i].id){
                    // remove that data from the array
                    parsedData.splice(i, 1)
                }
            }
            // rewrite the db with new notes
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err)=>{
                if(err) console.log(err)
                res.json(parsedData)
            })
        }
    })

})

// to make it easier to open the server
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))