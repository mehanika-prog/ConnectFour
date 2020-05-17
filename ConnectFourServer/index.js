const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { getComments, addComment } = require('./services/CommentService')
const { getRatings, addRating } = require('./services/RatingService')
const { getTopScores, addScore } = require('./services/ScoreService')

const hostname = config.get('hostname')
const port = config.get('port')
const mongoConnectionString = config.get('mongodb_server')

mongoose.connect(mongoConnectionString,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

const server = express()

server.use(cors())
server.use(express.json())

server.get('/api/score', (req, res) => {

    getTopScores().then(data => {
        res.contentType('application/json')
        res.json(data)
    })

})

server.post('/api/score', (req, res) => {

    const status = addScore(req.body.name, req.body.count) === true ? 200 : 503
    res.status(status).end()

})

server.get('/api/rating', (req, res) => {

    getRatings().then(data => {
        res.contentType('application/json')
        res.json(data)
    })

})

server.post('/api/rating', (req, res) => {

    const status = addRating(req.body.count) === true ? 200 : 503
    res.status(status).end()

})

server.get('/api/comment', (req, res) => {

    getComments().then(data => {
        res.contentType('application/json')
        res.json(data)
    })

})

server.post('/api/comment', (req, res) => {

    const status = addComment(req.body.author, req.body.text) === true ? 200 : 503
    res.status(status).end()

})

const { getEmptyField, getNextField } = require('./game/Field')

server.get('/game', (req, res) => {

    res.json(getEmptyField())

})

server.post('/game', (req, res) => {

    res.json(getNextField(req.body))

})

server.listen(port, () => {
    console.log(`Server starts on port: ${port}`);
})