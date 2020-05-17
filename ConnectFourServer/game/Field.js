function getCoords(direction) {
    switch (direction) {
        case 'north': return [-1, 0]
        case 'north_west': return [-1, -1]
        case 'west': return [0, -1]
        case 'south_west': return [1, -1]
        case 'south': return [1, 0]
        case 'south_east': return [1, 1]
        case 'east': return [0, 1]
        case 'north_east': return [-1, 1]
        default: return [0, 0]
    }
}

function coordsToCheckOnDirection(row, col, mul, direction){

    const coordsss = getCoords(direction)
    coordsss[0] = (coordsss[0] * mul) + row
    coordsss[1] = (coordsss[1] * mul) + col
    return coordsss

}

function emptyField(){
    return {
        'field':
            {'tiles': [
                    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
                    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
                    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
                    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
                    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
                    ['E', 'E', 'E', 'E', 'E', 'E', 'E']]
            },
        'playersTurn': 'B',
        'winner': 'E',
        'move': '\u0000',
        'playersScore': [
            21000,
            21000
        ],
        'gameWon': false,
        'existEmpty': true,
        'existEmptyInCol': [
            true,
            true,
            true,
            true,
            true,
            true,
            true
        ],
        'getEmptyInCol': function(col){

            for (let i = 0; i < 6; i++)
            {
                if (this.field.tiles[i][col] === 'E') return true;
            }
            return false

        },
        'getEmpty': function(){

            for (let i = 0; i < 7; i++)
            {
                if (this.getEmptyInCol(i)) return true;
            }
            return false;

        },
        'fillFromTop': function(col, player){
            for (let i = 5; i >= 0; i--)
            {
                if (this.field.tiles[i][col] === 'E'){
                    this.field.tiles[i][col] = player
                    break
                }
            }
        },
        'fourConnected': function(row, col, direction){

            const player = this.field.tiles[row][col]

            if(player === 'E') return 'E'

            for (let i = 1; i < 4; i++)
            {
                const coords = coordsToCheckOnDirection(row, col, i, direction)

                if (coords[0] < 0 || coords[0] > 5) {
                    return 'E'
                }
                if (coords[1] < 0 || coords[1] > 6) {
                    return 'E'
                }
                if (this.field.tiles[coords[0]][coords[1]] !== player) {
                    return 'E'
                }
            }
            return this.field.tiles[row][col]

        },
        'getWinner': function (){

            for (let i = 0; i < 6; i++)
            {
                for (let j = 0; j < 7; j++)
                {
                    if (this.field.tiles[i][j] !== 'E')
                    {
                        if (this.fourConnected(i, j, 'north') !== 'E') return this.field.tiles[i][j]
                        if (this.fourConnected(i, j, 'west') !== 'E') return this.field.tiles[i][j]
                        if (this.fourConnected(i, j, 'south') !== 'E') return this.field.tiles[i][j]
                        if (this.fourConnected(i, j, 'east') !== 'E') return this.field.tiles[i][j]
                        if (this.fourConnected(i, j, 'north_west') !== 'E') return this.field.tiles[i][j]
                        if (this.fourConnected(i, j, 'south_west') !== 'E') return this.field.tiles[i][j]
                        if (this.fourConnected(i, j, 'north_east') !== 'E') return this.field.tiles[i][j]
                        if (this.fourConnected(i, j, 'north_east') !== 'E') return this.field.tiles[i][j]
                    }
                }
            }
            return 'E'
        }
    }
}

function getEmptyField(){
    return emptyField()
}

function getNextField(field){

    const newField = emptyField()

    newField.field = field.field
    newField.playersTurn = field.playersTurn
    newField.winner = field.winner
    newField.move = field.move
    newField.playersScore = field.playersScore
    newField.gameWon = field.gameWon
    newField.existEmpty = field.existEmpty
    newField.existEmptyInCol = field.existEmptyInCol

    switch (newField.move){
        case 'Q':
            newField.fillFromTop(0, newField.playersTurn);
            break;

        case 'W':
            newField.fillFromTop(1, newField.playersTurn);
            break;

        case 'E':
            newField.fillFromTop(2, newField.playersTurn);
            break;

        case 'R':
            newField.fillFromTop(3, newField.playersTurn);
            break;

        case 'T':
            newField.fillFromTop(4, newField.playersTurn);
            break;

        case 'Y':
            newField.fillFromTop(5, newField.playersTurn);
            break;

        case 'U':
            newField.fillFromTop(6, newField.playersTurn);
            break;

    }

    for (let i = 0; i < 7; i++){
        if(!newField.getEmptyInCol(i)) field.existEmptyInCol[i] = false;
    }

    newField.existEmpty = newField.getEmpty()

    const winner = newField.getWinner()

    if (winner === 'E') newField.winner = 'E';
    else if (winner === 'B')
    {
        newField.winner = 'B';
        newField.gameWon = true;
    }
    else
    {
        newField.winner = 'R';
        newField.gameWon = true;
    }

    if (newField.playersTurn === 'B')
    {
        newField.playersScore[0] -= 1000;
        newField.playersTurn = 'R';
    }
    else if (newField.playersTurn === 'R') {
        newField.playersScore[1] -= 1000;
        newField.playersTurn = 'B';
    }

    return newField

}

exports.getEmptyField = getEmptyField
exports.getNextField = getNextField