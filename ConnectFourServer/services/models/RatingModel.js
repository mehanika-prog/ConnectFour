const { model, Schema } = require('mongoose')

const ratingSchema = new Schema({

    count: {
        type: Number,
        required: true
    }

})

module.exports = model('Rating', ratingSchema)