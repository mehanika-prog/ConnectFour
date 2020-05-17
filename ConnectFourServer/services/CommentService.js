const Comment = require('./models/CommentModel')

function getComments() {
    return new Promise(resolve => {
        Comment.find({}, (err, data) => {
            resolve(data)
        })
            .sort({ _id: -1 })
    })
}

function addComment(author, text) {
    Comment({ author: author, text: text })
        .save(err => {
            if(err) {
                console.log(err)
                return false
            }
        })
    return true
}


exports.getComments = getComments
exports.addComment = addComment
