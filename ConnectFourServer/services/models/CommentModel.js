const { model, Schema } = require('mongoose')

const commentSchema = new Schema({

    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }

})

module.exports = model('Comment', commentSchema)