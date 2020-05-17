import {sendRequest} from "./utils.js"
import {commentUrl} from "./settings.js"

const commentContainer = document.getElementById('comments_container')
const addCommentButton = document.getElementById('add_comment_button')
const nameInput = document.getElementById('name')
const commentInput = document.getElementById('comment')

sendRequest('GET', commentUrl)
    .then(data => {
        commentContainer.innerHTML = data.map(data => {
            return `<div class="comment">
                        <h4>${data.author}</h4>
                        <p>${data.text}</p>
                    </div>`
        }).join('')
    })

addCommentButton.onclick = async () => {
    const name = nameInput.value
    const comment = commentInput.value
    if(comment.length > 0 && name.length > 0){
        await sendRequest(
            'POST',
            commentUrl,
            {
                "author": name,
                "text": comment
            })
        location.reload()
    }
}