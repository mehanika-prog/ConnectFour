import {ratingUrl, scoreUrl} from "./settings.js";

const sendRequest = (method, url, body = null) => {
     return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.setRequestHeader("content-type", "application/json; charset=utf-8")
        xhr.responseType = 'json'
        xhr.onload = () => {
            resolve(xhr.response)
        }
        xhr.onerror = () => {
            throw new Error('Error!')
        }
        xhr.send(JSON.stringify(body))
    })
}

const printField = (data, field) => {
    let html = String();
    html += '<table>'
    for(let i = 0; i < 6; i++){
        html += '<tr>'
        for(let t = 0; t < 7; t++){
            // html += `<th>${data.field.tiles[i][t]}</th>`
            if(data.field.tiles[i][t] === 'B') html += '<th><div class="disc blue"></div></th>'
            if(data.field.tiles[i][t] === 'R') html += '<th><div class="disc red"></div></th>'
            if(data.field.tiles[i][t] === 'E') html += '<th><div class="disc"></div></th>'
        }
        html += '</tr>'
    }

    html += '</table>'
    field.innerHTML = html
}

const gameWon = (winner) => {
    let winnerText
    if(winner === 'B') winnerText = 'Blue player win!'
    if(winner === 'R') winnerText = 'Red player win!'
    if(winner === 'E') winnerText = 'This game haven`t winner!'
    alert(winnerText)
    window.location.assign('./../index.html')
}

const selectRating = (id, color) => {
    document.getElementById('1').style.borderColor = 'rgba(0,0,0,0)'
    document.getElementById('2').style.borderColor = 'rgba(0,0,0,0)'
    document.getElementById('3').style.borderColor = 'rgba(0,0,0,0)'
    document.getElementById('4').style.borderColor = 'rgba(0,0,0,0)'
    document.getElementById('5').style.borderColor = 'rgba(0,0,0,0)'
    document.getElementById(id).style.borderColor = color
}

const openModal = (data) => {
    if(data.winner === 'E'){
        document.getElementById('modalBg2').style.display = 'block'
        document.getElementById('button2').addEventListener('click', () => {
            window.location.assign('./../index.html')
        })
    }else{
        let rating = 0
        document.getElementById('winner').innerText = data.winner === 'B' ? 'Blue' : 'Red'
        document.getElementById('winner').style.color  = (data.winner === 'B') ? '#798dff' : '#d96666'
        document.getElementById('points').innerText =
            `You catch ${(data.winner === 'B') ? data.playersScore[0] : data.playersScore[1]} points.`
        document.getElementById('modalBg').style.display = 'block'
        document.getElementById('1').addEventListener('click', () => {
            selectRating('1', 'red')
            rating = 1
        })
        document.getElementById('2').addEventListener('click', () => {
            selectRating('2', 'orange')
            rating = 2
        })
        document.getElementById('3').addEventListener('click', () => {
            selectRating('3', 'yellow')
            rating = 3
        })
        document.getElementById('4').addEventListener('click', () => {
            selectRating('4', 'lime')
            rating = 4
        })
        document.getElementById('5').addEventListener('click', () => {
            selectRating('5', 'blue')
            rating = 5
        })
        document.getElementById('button').addEventListener('click', () => {
            const name = document.getElementById('name').value
            if(name.length > 0 && rating > 0){
                sendRequest(
                    'POST',
                    scoreUrl,
                    {
                        'name': name,
                        'count': (data.winner === 'B') ? data.playersScore[0] : playersScore[1]
                    }
                )
                    .then(() => {
                        sendRequest(
                            'POST',
                            ratingUrl,
                            {
                                'count': rating
                            })
                            .then(() => {
                                window.location.assign('./../index.html')
                            })
                    })
            }
        })
    }
}

export {sendRequest, printField, openModal}