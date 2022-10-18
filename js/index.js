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

isAlone = function (mapa, y, x) {
    if (y === 0 && x === 0) {  //esquina superior izquierda
        return mapa.booleanMap[y + 1][x] === 0 && mapa.booleanMap[y][x + 1] === 0 && mapa.booleanMap[y + 1][x + 1] === 0
    }
    else if (y === 0 && x === 9) {  //esquina superior derecha
        return mapa.booleanMap[y + 1][x] === 0 && mapa.booleanMap[y][x - 1] === 0 && mapa.booleanMap[y + 1][x - 1] === 0
    }
    else if (y === 9 && x === 0) {  //esquina inferior izquierda
        return mapa.booleanMap[y - 1][x] === 0 && mapa.booleanMap[y][x + 1] === 0 && mapa.booleanMap[y - 1][x + 1] === 0
    }
    else if (y === 9 && x === 9) {  //esquina inferior derecha
        return mapa.booleanMap[y - 1][x] === 0 && mapa.booleanMap[y][x - 1] === 0 && mapa.booleanMap[y - 1][x - 1] === 0
    }
    else if (y === 0) {  //primera fila
        return mapa.booleanMap[y + 1][x] === 0 && mapa.booleanMap[y][x + 1] === 0 && mapa.booleanMap[y][x - 1] === 0 && mapa.booleanMap[y + 1][x + 1] === 0 && mapa.booleanMap[y + 1][x - 1] === 0
    }
    else if (y === 9) {  //ultima fila
        return mapa.booleanMap[y - 1][x] === 0 && mapa.booleanMap[y][x + 1] === 0 && mapa.booleanMap[y][x - 1] === 0 && mapa.booleanMap[y - 1][x + 1] === 0 && mapa.booleanMap[y - 1][x - 1] === 0
    }
    else if (x === 0) {  //primera columna
        return mapa.booleanMap[y][x + 1] === 0 && mapa.booleanMap[y - 1][x] === 0 && mapa.booleanMap[y + 1][x] === 0 && mapa.booleanMap[y - 1][x + 1] === 0 && mapa.booleanMap[y + 1][x + 1] === 0
    }
    else if (x === 9) {  //ultima columna
        return mapa.booleanMap[y][x - 1] === 0 && mapa.booleanMap[y - 1][x] === 0 && mapa.booleanMap[y + 1][x] === 0 && mapa.booleanMap[y - 1][x - 1] === 0 && mapa.booleanMap[y + 1][x - 1] === 0
    }
    else { return mapa.booleanMap[y + 1][x] === 0 && mapa.booleanMap[y - 1][x] === 0 && mapa.booleanMap[y][x + 1] === 0 && mapa.booleanMap[y][x - 1] === 0 && mapa.booleanMap[y + 1][x + 1] === 0 && mapa.booleanMap[y - 1][x - 1] === 0 && mapa.booleanMap[y + 1][x - 1] === 0 && mapa.booleanMap[y - 1][x + 1] === 0 }
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

// LÓGICA PARA RANDOMIZAR:
function BarcoPequeño()
{
    this.head = {x:0,y:0}; // Coordenadas de la cabeza
    this.positions = [{x:0,y:0}] // Resto del cuerpo del barco, vienen en pares ordenados de valores.
    this.healt = 2; // Valor de vida del barco (provisional)
}

function BarcoMediano()
{
    this.head = {x:0,y:0};
    this.positions = [{x:0,y:0},{x:0,y:0}]
    this.healt = 3;
}

function BarcoGrande()
{
    this.head = {x:0,y:0};
    this.positions = [{x:0,y:0},{x:0,y:0},{x:0,y:0}]
    this.healt = 4;
}

function BarcoGigante()
{
    this.head = {x:0,y:0};
    this.positions = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]
    this.healt = 5;
}

function BattleMap(num)
{
    this.booleanMap = CreateZerosMatrix(num);
}

function CreateZerosMatrix(num)
{
    var array = [];
    for (let i = 0; i < num; i++)
    {
        var newRow = [];
        for (let j = 0; j < num; j++)
        {
            newRow.push(0);
        }
        array.push(newRow);
    }
    return array;
}

function SetMapForOneShip(barco, mapa)
{
    SetRandomPositions(barco, mapa);
    SetSpreadDirection(barco);
    var arrayTablaAux = IsPosiblePosition(barco, mapa);
    if (arrayTablaAux != 0)
    {
        UpdateBoardPoint(arrayTablaAux, barco, mapa);
    }
}

function SetRandomPositions(barco)
{
    var randomNumberForColumn = parseInt(Math.random() * 10); // Número aleatorio entre 1 al 10
    var randomNumberForRow = parseInt(Math.random() * 10); // Número aleatorio entre 1 al 10
    var newPosition = {x:randomNumberForRow,y:randomNumberForColumn}; // Objeto con 2 coordenadas X e Y
    barco.head = newPosition; // Se cambia la propiedad del objeto "barco" por la nueva creada
}

function SetSpreadDirection(barco)
{
    var arrayDirections = ["right","down","left","up"];
    var randomDirection = Math.floor(Math.random() * arrayDirections.length);
    switch(arrayDirections[randomDirection])
    {
        case "right":
            for (let i = 0; i < barco.positions.length; i++)
            {
                // LAS X SON LAS COLUMNAS "TD"
                barco.positions[i].x = barco.head.x + 1 + i;
                // LAS Y SON LAS FILAS "TR"
                barco.positions[i].y = barco.head.y;
            }
            break;
        case "down":
            for (let i = 0; i < barco.positions.length; i++)
            {
                barco.positions[i].x = barco.head.x;
                barco.positions[i].y = barco.head.y + 1 + i;
            }
            break;
        case "left":
            for (let i = 0; i < barco.positions.length; i++)
            {
                barco.positions[i].x = barco.head.x - 1 - i;
                barco.positions[i].y = barco.head.y;
            }
            break;
        case "up":
            for (let i = 0; i < barco.positions.length; i++)
            {
                barco.positions[i].x = barco.head.x;
                barco.positions[i].y = barco.head.y - 1 - i;
            }
            break;
    }
}

function IsPosiblePosition(barco, mapa)
{
    var arrayTablaAux = CreateZerosMatrix(10);
    var flag = true;
    //var booleanMap = mapa.booleanMap; // variable SOLO PARA DEPURACIÓN
    for (let i = 0; i < barco.positions.length; i++)
    {
        var posicionX = barco.positions[i].x;
        var posicionY = barco.positions[i].y;
        if (IsShipInsideTable(barco,i,mapa) && isAlone(mapa, posicionY, posicionX))
        {
             // Guardar en variable auxiliar
            arrayTablaAux[posicionX][posicionY] = 1;
        }
    }
    return arrayTablaAux;
}

function IsShipInsideTable(barco, i, mapa)
{
    // Devuelve true o false
    return barco.positions[i].x >= 0 && barco.positions[i].x < mapa.booleanMap[i].length && barco.positions[i].y >= 0 && barco.positions[i].y < mapa.booleanMap.length;
}

function IsShipAlone(barco, i, mapa)
{
    // Devuelve true o false, hay que mejorarla para no colocar barcos en entorno de otros.
    return mapa.booleanMap[barco.positions[i].x][barco.positions[i].y] == 0 && mapa.booleanMap[barco.head.x][barco.head.y] == 0;
}

function UpdateBoardPoint(arrayTablaAux, barco, mapa)
{
    //var actualBooleanMap = mapa.booleanMap;
    for (let i = 0; i < mapa.booleanMap.length; i++)
    {
        for (let j = 0; j < mapa.booleanMap[i].length; j++)
        {
            if (arrayTablaAux[i][j] == 1) // SI EN EL ARRAYS HAY UNOS SI O SI PONE LA CABEZA DEL BARCO SI NO, NO LA PONE
            {
                mapa.booleanMap[i][j] = 1;
                mapa.booleanMap[barco.head.x][barco.head.y] = 1;
            }
        }
    }
}

// Creación de flota:
function CreateFlotaTipo1()
{
    var arrayFlota = [];
    arrayFlota.push(new BarcoPequeño());
    arrayFlota.push(new BarcoMediano());
    arrayFlota.push(new BarcoMediano());
    arrayFlota.push(new BarcoMediano());
    arrayFlota.push(new BarcoGrande());
    arrayFlota.push(new BarcoGigante());
    return arrayFlota;
}

// Creación de flota del jugador:
var arrayFlotaPlayer = CreateFlotaTipo1();
// Objeto mapa del jugador:
var mapaPlayer = new BattleMap(10);
CreateRandomMap(arrayFlotaPlayer,mapaPlayer);
// Mostrar mapa del jugador:
console.log(mapaPlayer.booleanMap);
console.log(recuento(mapaPlayer));
// Creación de flota del enemigo:
var arrayFlotaEnemy = CreateFlotaTipo1();
// Objeto mapo del enemigo:
var mapaEnemy = new BattleMap(10);
CreateRandomMap(arrayFlotaEnemy,mapaEnemy);
// Mostrar mapa del enemigo:
console.log(mapaEnemy.booleanMap);
console.log(recuento(mapaEnemy));

function CreateRandomMap(arrayFlota, mapa)
{
    var cuentaActual = 0;
    var sumaVidas = SumHealth(arrayFlota)
    while(cuentaActual != sumaVidas)
    {
        mapa.booleanMap = CreateZerosMatrix(10);
        for (let i = 0; i < arrayFlota.length; i++)
        {
            SetMapForOneShip(arrayFlota[i], mapa)
        }
        cuentaActual = recuento(mapa)
    }
}

function recuento(mapa)
{
    var cuenta = 0;
    for( let i = 0; i < mapa.booleanMap.length; i++)
    {
        for (let j = 0; j < mapa.booleanMap[i].length; j++)
        {
            if(mapa.booleanMap[i][j] == 1)
            {
                cuenta++;
            }
        }
    }
    return cuenta;
}

function SumHealth(arrayFlota)
{
    var suma = 0;
    for (let i = 0; i < arrayFlota.length; i++)
    {
        suma += arrayFlota[i].healt;
    }
    return suma;
}
