# Battleship Game
Un proyecto desarrollado en una semana por un equipo de tres estudiantes de [Reboot Academy](https://reboot.academy/).
## Introducción
Nuestro primer proyecto en el Bootcamp consistió en desarrollar un videojuego sencillo en navegador. Después de barajar varias opciones, nos decidimos por implementar nuestra propia versión simplificada del juego de mesa Hundir la Flota (Battleship).
## Descripción del juego
¿Y en qué consiste Hundir la Flota? 

![](https://ideascdn.lego.com/media/generate/lego_ci/59cb75ae-6ff3-4d28-a2cd-5b913df94306/resize:550:233/legacy)

consiste en atacar las posiciones del enemigo por turnos mediante coordenadas, tratando de tocar y hundir los barcos del rival antes de que éste hunda los tuyos. Cada jugador coloca sus barcos en secreto antes de empezar la partida, y gana el primero en hundir todos los barcos de su contrincante.
## demo
En nuestra versión simplificada se juega contra la máquina, y consta de las siguientes características:  

- Dos tableros de 10x10 casillas.
- 6 barcos de una casilla de tamaño colocados aleatoriamente por tablero.
- Secuencia de turnos alternados entre jugador y máquina, en el que:
	1) El jugador selecciona una casilla del tablero enemigo para atacar.
	2) La máquina ataca una casilla aleatoria del tablero del jugador.
- Se muestran diferentes imágenes para los diferentes estados de las casillas (Agua, barco, hundido y fallo).
- Fin de juego declarando al vencedor, permitiendo jugar una nueva partida mediante un botón.
### ---tecnologias---
Para desarrollar este proyecto hemos usado únicamente **HTML**, **CSS** y **JavaScript**.
### [Prueba nuestra demo](https://jlpbiuma.github.io/hundir-la-flota/)
## features pendientes:
- [x] Sprites estáticos
- [x] Efectos de sonido
- [x] Música de fondo
- [ ] Barcos de múltiples casillas
- [ ] Colocación manual  
- [ ] Animaciones
- [ ] Scoreboard
## Equipo de desarrollo:
- [Jose Luis Pordomingo Brito](https://github.com/jlpbiuma)
- [Esteban Ojeda Hernandez](https://github.com/TebyTeb)
- [Hamilton Vanegas Cifuentes](https://github.com/havacy7319)
