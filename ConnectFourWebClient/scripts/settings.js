const port = 5003 // Port to web server.
const ip = 'localhost' // IP Address to web server.
const gameUrl = `http://${ip}:${port}/game`
const commentUrl = `http://${ip}:${port}/api/comment`
const scoreUrl = `http://${ip}:${port}/api/score`
const ratingUrl = `http://${ip}:${port}/api/rating`

export {gameUrl, commentUrl, scoreUrl, ratingUrl}