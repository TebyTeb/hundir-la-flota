/*** --REPRESENTACIÓN EN HTML-- ***/

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

//Representa los barcos posicionados en el mapa designado
printShips = function (board, map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 1) {
                ship = document.querySelector(`#${board} #r${i + 1} #c${j + 1}`)
                ship.classList.add('boat')
            }
        }
    }
}

printMiss = function (cell) {
    cell.classList.add('water')
}

printHit = function (cell) {
    cell.classList.add('hit')
    cell.classList.remove('boat')
}

/** --LÓGICA DEL JUEGO-- **/

//Crea un mapa vacío sobre el que poner los barcos
battleMap = function () {
    var array = [];
    for (let i = 0; i < 10; i++) {
        var newRow = [];
        for (let j = 0; j < 10; j++) {
            newRow.push(0);
        }
        array.push(newRow);
    }
    return array
}

//Coloca barcos en un mapa (jugador o enemigo)
placeShip = function (num, map) {
    var ships = 0
    while (ships < num) {
        var y = Math.floor(Math.random() * map.length)
        var x = Math.floor(Math.random() * map.length)
        if (map[y][x] === 0 && isAlone(map, y, x) === true) {
            map[y][x] = 1
            ships++
        }
    }
    return map
}

//Comprueba que los alrededores de una posicion sean igual a 0
isAlone = function (map, y, x) {
    if (y === 0 && x === 0) {  //esquina superior izquierda
        return map[y + 1][x] === 0 && map[y][x + 1] === 0 && map[y + 1][x + 1] === 0
    }
    else if (y === 0 && x === 9) {  //esquina superior derecha
        return map[y + 1][x] === 0 && map[y][x - 1] === 0 && map[y + 1][x - 1] === 0
    }
    else if (y === 9 && x === 0) {  //esquina inferior izquierda
        return map[y - 1][x] === 0 && map[y][x + 1] === 0 && map[y - 1][x + 1] === 0
    }
    else if (y === 9 && x === 9) {  //esquina inferior derecha
        return map[y - 1][x] === 0 && map[y][x - 1] === 0 && map[y - 1][x - 1] === 0
    }
    else if (y === 0) {  //primera fila
        return map[y + 1][x] === 0 && map[y][x + 1] === 0 && map[y][x - 1] === 0 && map[y + 1][x + 1] === 0 && map[y + 1][x - 1] === 0
    }
    else if (y === 9) {  //ultima fila
        return map[y - 1][x] === 0 && map[y][x + 1] === 0 && map[y][x - 1] === 0 && map[y - 1][x + 1] === 0 && map[y - 1][x - 1] === 0
    }
    else if (x === 0) {  //primera columna
        return map[y][x + 1] === 0 && map[y - 1][x] === 0 && map[y + 1][x] === 0 && map[y - 1][x + 1] === 0 && map[y + 1][x + 1] === 0
    }
    else if (x === 9) {  //ultima columna
        return map[y][x - 1] === 0 && map[y - 1][x] === 0 && map[y + 1][x] === 0 && map[y - 1][x - 1] === 0 && map[y + 1][x - 1] === 0
    }
    else { return map[y + 1][x] === 0 && map[y - 1][x] === 0 && map[y][x + 1] === 0 && map[y][x - 1] === 0 && map[y + 1][x + 1] === 0 && map[y - 1][x - 1] === 0 && map[y + 1][x - 1] === 0 && map[y - 1][x + 1] === 0 }
}

//crea un mapa para el jugador o el enemigo con el numero de barcos designado
createBattleMap = function (num) {
    let map = battleMap()
    placeShip(num, map)
    return map
}

checkGameOver = function (map) {
    var sum = 0
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 1) {
                sum++
            }
        }
    }
    if (sum === 0) {
        alert('Game Over')
    }
}

//Comprobamos si hemos acertado o no
checkHit = function (map, cell, y, x) {
    if (map[y][x] === 1) {
        map[y][x] = 0
        printHit(cell)
        checkGameOver(map)
    } else {
        printMiss(cell)
    }
}

//Obtenemos las posiciones x e y del evento 'click' para comparar con el array objetivo
getCoord = function (e) {
    let cell = e.currentTarget
    //Obtenemos las coordenadas de la celda a traves de sus ID (r$ y c$) en formato string, haciendo un slice en la posición 1 para quedarnos con el número, al que convertimos a formato number para operar con él y le restamos 1 para obtener la posicion correcta en el mapa a comprobar
    let x = parseInt(cell.id.slice(1)) - 1
    let y = parseInt(cell.parentNode.id.slice(1)) - 1
    checkHit(enemyMap, cell, y, x)
}

/** --SETUP-- **/

//Construir un tablero para el jugador y otro para el enemigo
let gameOver = false
let playerMap = createBattleMap(5)
let enemyMap = createBattleMap(5)

//representar los tableros en pantalla
const playerBoard = newBoard('player')
const enemyBoard = newBoard('enemy')

//representar los barcos en cada tablero
printShips('player-board', playerMap)
printShips('enemy-board', enemyMap)


//Funcionalidad 'click' en el tablero enemigo
let cells = document.querySelectorAll('#enemy-board td')
for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = getCoord
}