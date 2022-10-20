/*** --REPRESENTACIÓN EN HTML-- ***/

//Constructor de tableros
function newBoard(owner) {
    let side = document.createElement('div')
    side.setAttribute('id', `${owner}-side`)

    let board = document.createElement('table')
    board.setAttribute('cellspacing', '0')
    board.setAttribute('cellpadding', '15px')
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

    let info = document.createElement('div')
    info.setAttribute('id', `${owner}-info`)
    info.innerHTML = `${returnBoatImages(shipAmount)}`

    document.querySelector('.canvas').appendChild(side)
    document.querySelector(`#${owner}-side`).appendChild(board)
    document.querySelector(`#${owner}-side`).appendChild(info)
}

function createButton() {
    let father = document.querySelector(".canvas");
    let button = document.createElement("div");
    button.innerHTML = "<button>START GAME!</button>";
    button.setAttribute("id", "main-button")
    father.appendChild(button);
}

function showButton() {
    if (gameOver === false) {
        buttonStart.classList.add("hide-button");
    }
    else {
        buttonStart.classList.remove("hide-button");
    }

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

function returnBoatImages(count) {
    let result = `<img class='hidden' src='img/spacer.png'></img>`
    for (let i = 0; i < count; i++) {
        result += `<img class='lifes' src='img/boat.png'></img>`
    }
    return result
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
    if (playerShips === 0) {
        turnFlag.innerText = 'ENEMY'
        winFlag.innerText = 'WINS'
        lose.play()
        deactivateAttack()
        clearTimeout(enemyTimer)
        gameOver = true;
        EndGame()
    } else if (enemyShips === 0) {
        turnFlag.innerText = 'PLAYER'
        winFlag.innerText = 'WINS'
        win.play();
        deactivateAttack()
        clearTimeout(enemyTimer)
        gameOver = true;
        EndGame()
    }
}

//Comprobamos si hemos acertado o no
checkHit = function (map, currMap, cell, y, x) {
    if (map[y][x] === 1) {
        hit.play()
        if (currMap === 'enemy') {
            playerShips--
            document.querySelector(`#player-info`).innerHTML = `${returnBoatImages(playerShips)}`
        } else {
            enemyShips--
            document.querySelector(`#enemy-info`).innerHTML = `${returnBoatImages(enemyShips)}`
        }
        map[y][x] = 3
        printHit(cell)
        checkGameOver(map)
    } else {
        miss.play();
        map[y][x] = 2
        printMiss(cell)
    }
}

//Obtenemos las posiciones x e y del evento 'click' para comparar con el array objetivo
getCoord = function (e) {
    turnFlag.innerText = 'ENEMY'
    playerTimer = null;
    let cell = e.currentTarget
    //Obtenemos las coordenadas de la celda a traves de sus ID (r$ y c$) en formato string, haciendo un slice en la posición 1 para quedarnos con el número, al que convertimos a formato number para operar con él y le restamos 1 para obtener la posicion correcta en el mapa a comprobar
    let x = parseInt(cell.id.slice(1)) - 1
    let y = parseInt(cell.parentNode.id.slice(1)) - 1
    let currMap = 'player'
    checkHit(enemyMap, currMap, cell, y, x)
    if (gameOver === false) {
        enemyTimer = setTimeout(enemyTurn, 1800)
    }
    deactivateAttack()
}

// Funcion de enemyTurn sin busqueda, únicamente random
function enemyTurn() {
    turnFlag.innerText = 'PLAYER'
    enemyTimer = null;
    var xValue = Math.floor(Math.random() * 10);
    var yValue = Math.floor(Math.random() * 10);
    while (FindElement(xValue, yValue)) {
        var xValue = Math.floor(Math.random() * 10);
        var yValue = Math.floor(Math.random() * 10);
        console.log(arrayAttacks)
    }
    arrayAttacks.push({ x: xValue, y: yValue });
    cell = document.querySelector(`#player-board #r${yValue + 1} #c${xValue + 1}`)
    let currMap = 'enemy'
    checkHit(playerMap, currMap, cell, yValue, xValue)
    if (gameOver === false) {
        playerTimer = setTimeout(activateAttack(),1800);
    }
}

function FindElement(x, y) {
    for (let i = 0; i < arrayAttacks.length; i++) {
        if (arrayAttacks[i].x === x && arrayAttacks[i].y === y) {
            return true;
        }
    }
    return false;
}

function deactivateAttack() {
    let cells = document.querySelectorAll('#enemy-board td')
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = null
    }
}

function activateAttack() {
    let cells = document.querySelectorAll('#enemy-board td')
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].className == "" || cells[i].className == "boat")
            cells[i].onclick = getCoord
    }
}

function StartGame() {
    transition.play();
    let cells = document.querySelectorAll('td')
    for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute('class', '')
    }
    printShips('player-board', playerMap)
    /* printShips('enemy-board', enemyMap) */
    document.querySelector(`#player-info`).innerHTML = `${returnBoatImages(playerShips)}`
    document.querySelector(`#enemy-info`).innerHTML = `${returnBoatImages(enemyShips)}`
    buttonStart.onclick = null;
    var divButton = document.querySelector("#main-button");
    divButton.classList.add('hide-button')
    turnFlag.innerText = 'PLAYER'
    winFlag.innerText = 'TURN'
    gameOver = false
    activateAttack();
}

function EndGame() {
    var divButton = document.querySelector("#main-button");
    divButton.classList.remove('hide-button')
    buttonStart.innerText = "START NEW GAME!"
    buttonStart.onclick = null
    enemyTimer = null;
    shipAmount = 6;
    playerShips = shipAmount;
    enemyShips = shipAmount;
    playerMap = createBattleMap(shipAmount)
    enemyMap = createBattleMap(shipAmount)
    arrayAttacks = []
    buttonStart.addEventListener('click', StartGame)
}



/** --SETUP-- **/

//Selección del rótulo principal del juego.
let turnFlag = document.querySelector('#turn')
let winFlag = document.querySelector('#win')

//Establecemos una variable global para comprobar si ha acabado el juego
let gameOver = false

//Establecemos un timer para el turno del enemigo
let enemyTimer = null
let playerTimer = null
//Establece la cantidad de barcos de inicio, y las 'vidas' iniciales de jugador y enemigo.
let shipAmount = 6
let playerShips = shipAmount
let enemyShips = shipAmount

//Construir un tablero para el jugador y otro para el enemigo
let playerMap = createBattleMap(shipAmount)
let enemyMap = createBattleMap(shipAmount)
var arrayAttacks = [];

//representar los tableros y el botón en pantalla
const playerBoard = newBoard('player')
const enemyBoard = newBoard('enemy')
createButton()

// Llamada a botón para iniciar la partida
const buttonStart = document.querySelector('#main-button button');

const buttonWelcome = document.querySelector('#start-button button');

//representar los barcos en cada tablero previsualización en la primera partida
printShips('player-board', playerMap)
/* printShips('enemy-board', enemyMap) */
// Importar audios:
const transition = new Audio("./audio/transicionEffect.mp3")
transition.volume = 0.07;
const hit = new Audio("./audio/hitEffect.mp3")
hit.volume = 0.07;
const miss = new Audio("./audio/missEffect.mp3")
miss.volume = 0.07;
const win = new Audio("./audio/Win.mp3")
win.volume = 0.07;
const lose = new Audio("./audio/Lose.mp3")
lose.volume = 0.07;
const ost = new Audio("./audio/ost.wav")
ost.volume = 0.015
ost.loop = true

turnFlag.innerText = 'GET'
winFlag.innerText = 'READY'
buttonWelcome.addEventListener('click', function () {
    ost.play()
    document.querySelector('.canvas').style.display = 'block'
    document.querySelector('.welcome').style.display = 'none'
    StartGame()
})
