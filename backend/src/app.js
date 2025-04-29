const express = require('express')
const routes = require('./routes.js')
const cors = require('cors')

const app = express()

// Ler body com json
app.use(express.json())

// Cors
app.use(cors())
/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")

    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")

    res.header("Access-Control-Allow-Headers", "Content-Type")

    next()
})
*/

// Usar o routes
app.use(routes)

module.exports = app
