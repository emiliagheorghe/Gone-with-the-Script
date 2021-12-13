const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const app = express()
app.use(bodyParser.json())

app.get('/users', async (req, res) => {
    try {

    }
    catch (error) {
        console.warn(error)
    }
})

app.listen(8080)