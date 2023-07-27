// importing required modules for express back end
const express = require('express')
const app = express()
const path = require('path')

const PORT = 3001

// setting the root to public
app.use(express.static('public'))

// must create at least 3 back end response

