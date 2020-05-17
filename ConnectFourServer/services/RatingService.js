const Rating = require('./models/RatingModel')

function getRatings() {
    return new Promise(resolve => {
        Rating.find({}, (err, data) => {
            resolve(data)
        })
    })
}

function addRating(count) {
    Rating({ count: count })
        .save(err => {
            if(err) {
                console.log(err)
                return false
            }
        })
    return true
}


exports.getRatings = getRatings
exports.addRating = addRating
