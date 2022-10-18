
//Constructor de tableros
function newBoard(owner) {
    let board = document.createElement('table')
    board.setAttribute('cellspacing', '0')
    board.setAttribute('cellpadding', '10px')
    board.setAttribute('border', '1px')
    board.setAttribute('id', `${owner}-board`)
    board.innerHTML = `<caption>${owner.toUpperCase()} BOARD</caption>`
    for (let i = 0; i < 10; i++) {
        let row = document.createElement('tr')
        row.setAttribute('id', `r${i + 1}`)
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('td')
            cell.setAttribute('id', `c${j + 1}`)
            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    document.querySelector('.canvas').appendChild(board)
}

//Construir un tablero para el jugador y otro para el enemigo
const playerBoard = newBoard('player')
const enemyBoard = newBoard('enemy')



placeShip = function (board, x, y) {
    ship = document.querySelector(`#${board} #r${x + 1} #c${y + 1}`)
    ship.classList.add('boat')
}

placeShip('player-board', 9, 9)
placeShip('enemy-board', 5, 8)


isMiss = function (cell) {
    cell.classList.add('water')
}

isHit = function (cell) {
    cell.classList.add('hit')
    cell.classList.remove('boat')
}




checkHit = function (e) {
    let cell = e.currentTarget
    let cellStat = e.currentTarget.classList.value
    if (cellStat === 'boat') {
        isHit(cell)
    } else if (cellStat === '') {
        isMiss(cell)
    }
}

let cells = document.querySelectorAll('#enemy-board td')
for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = checkHit;
}


/* let playerBoard = function () {
    var array = [];
    var ships = 0
    for (let i = 0; i < 4; i++) {
        var newRow = [];
        for (let j = 0; j < 4; j++) {
            newRow.push(0);
        }
        array.push(newRow);
    }
    while (ships < 3) {
        array[Math.floor(Math.random() * array.length)][Math.floor(Math.random() * array.length)] = 1
        ships++
    }
    return array
}

console.log(playerBoard()) */