import {sendRequest, printField, openModal} from './utils.js'
import {gameUrl} from "./settings.js";

const url = gameUrl
const _pointer = document.getElementById('pointer')
const _field = document.getElementById('field')
let _data;

const changePointer = (data, pointer) => {
    if(data.playersTurn === 'B') pointer.innerHTML = '<span style="color: #798dff">Blue</span> players turn!'
    if(data.playersTurn === 'R') pointer.innerHTML = '<span style="color: #d96666">Red</span> players turn!'
}

const buttonRequest = () => {
    sendRequest(
        'POST',
        url,
        _data)
        .then(data => {
            _data = data
        })
        .then(() => {
            changePointer(_data, _pointer)
            printField(_data, _field)
            console.log(_data)
            if(_data.gameWon || !_data.existEmpty) setTimeout(() => {
                openModal(_data)
            }, 3000)
        })
}

sendRequest('GET', url)
    .then(data => {
        _data = data
    })
    .then(() => {
        changePointer(_data, _pointer)
        printField(_data, _field)
        console.log(_data)
    })

document.getElementById('Q').addEventListener('click', () => {
    _data.move = 'Q'
    if(_data.existEmptyInCol[0] && !_data.gameWon) buttonRequest()
})
document.getElementById('W').addEventListener('click', () => {
    _data.move = 'W'
    if(_data.existEmptyInCol[1] && !_data.gameWon) buttonRequest()
})
document.getElementById('E').addEventListener('click', () => {
    _data.move = 'E'
    if(_data.existEmptyInCol[2] && !_data.gameWon) buttonRequest()
})
document.getElementById('R').addEventListener('click', () => {
    _data.move = 'R'
    if(_data.existEmptyInCol[3] && !_data.gameWon) buttonRequest()
})
document.getElementById('T').addEventListener('click', () => {
    _data.move = 'T'
    if(_data.existEmptyInCol[4] && !_data.gameWon) buttonRequest()
})
document.getElementById('Y').addEventListener('click', () => {
    _data.move = 'Y'
    if(_data.existEmptyInCol[5] && !_data.gameWon) buttonRequest()
})
document.getElementById('U').addEventListener('click', () => {
    _data.move = 'U'
    if(_data.existEmptyInCol[6] && !_data.gameWon) buttonRequest()
})