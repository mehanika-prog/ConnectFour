import {sendRequest} from "./utils.js"
import {ratingUrl} from "./settings.js";

const startButton = document.getElementById('startButton')
const commentButton = document.getElementById('commentsButton')
const hofButton = document.getElementById('hofButton')
const rating = document.getElementById('rainbow-text')

startButton.onclick = () => {
    window.location.assign('./pages/game.html')
}

commentButton.onclick = () => {
    window.location.assign('./pages/comments.html')
}

hofButton.onclick = () => {
    window.location.assign('./pages/hof.html')
}

sendRequest('GET', ratingUrl)
    .then(data => {
        let count = 0
        let number = 0
        data.forEach(data => {
            count++
            number += data.count
        })
        const ratingNumber = (number / count).toFixed(1)
        if(ratingNumber - Number(ratingNumber).toFixed(0) === 0){
            rating.innerText = Math.floor(ratingNumber)
        }else rating.innerText = ratingNumber
    })