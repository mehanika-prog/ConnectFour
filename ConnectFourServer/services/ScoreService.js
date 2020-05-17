const Score = require('./models/ScoreModel')

function getTopScores() {
    return new Promise(resolve => {
        Score.find({}, (err, data) => {
            resolve(data)
        })
            .sort({ count: -1 })
            .limit(7)
    })
}

function addScore(name, count) {
    Score({ name: name, count: count })
        .save(err => {
            if(err) {
                console.log(err)
                return false
            }
        })
    return true
}


exports.getTopScores = getTopScores
exports.addScore = addScore
