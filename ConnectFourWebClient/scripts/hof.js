import {sendRequest} from "./utils.js";
import {scoreUrl} from "./settings.js"

const scoreContainer = document.getElementById('hof_container')
let hofHtml

sendRequest('GET', scoreUrl)
    .then(data => {
        hofHtml = '<table>'
        hofHtml += `<tr>
                        <th></th>
                        <th>Player Name</th>
                        <th>Score</th>
                    </tr>`

        hofHtml += data.map((data, index) => {
            return `<tr>
                        <td data-th="">${index + 1}</td>
                        <td data-th="Player Name">${data.name}</td>
                        <td data-th="Score">${data.count}</td>
                    </tr>`
        }).join('')

        hofHtml += '</table>'
        scoreContainer.innerHTML = hofHtml
    })