const { model, Schema } = require('mongoose')

const scoreSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }

})

module.exports = model('Score', scoreSchema)