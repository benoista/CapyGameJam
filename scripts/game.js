
import {Simon} from "./class_simon.js";
import {Colors} from "./colors.js"
import {Player, PLAYERS} from "/scripts/audio.js"


class Game {
    static DIFFICULTY = 0;
    static MULTIPLIER = 0.1;
    static COLOR_MULT = 40;
    static DALTONISME = false
    static score = 0
    static level = 0
    static simons = []
    static loop = null
    static PLAYER = new Player();
}

function generateChoice() {
    return ['e1', 'e2', 'e3', 'e4'][Math.floor(Math.random() * 4)];
}

function generateOtherColors(color) {
    console.log(1000 * Game.DIFFICULTY)
    return [
        Colors.generateColorVariation(color, Game.COLOR_MULT * (1 - Game.DIFFICULTY)),
        Colors.generateColorVariation(color, Game.COLOR_MULT * (1 - Game.DIFFICULTY)),
        Colors.generateColorVariation(color, Game.COLOR_MULT * (1 - Game.DIFFICULTY))
    ]
}
function generateOtherColorsDaltonism(color) {
    return [
        Colors.generateColorVariationDaltonism(color, Game.COLOR_MULT * (1 - Game.DIFFICULTY)),
        Colors.generateColorVariationDaltonism(color, Game.COLOR_MULT * (1 - Game.DIFFICULTY)),
        Colors.generateColorVariationDaltonism(color, Game.COLOR_MULT * (1 - Game.DIFFICULTY))
    ]
}

function update() {

    //displayScore()

    let color = Colors.generateRandomColor()
    let otherColors = generateOtherColors(color)

    if (Game.DALTONISME) {
        color = Colors.generateRandomColorDaltonism()
        otherColors = generateOtherColorsDaltonism(color)
    }
    
    setAnimColor(color)

    const setChoice = simon => simon.setChoice(generateChoice(), color, otherColors)
    Game.simons.forEach(setChoice)
}

function setAnimColor(color) {
    const root = document.querySelector(':root')
    root.style.setProperty('--shadow-color', color);
    //root.style.setProperty('--border-color', Colors.editColor(color, 150));
}

function split() {

    addSimons()

    Game.level++
    Game.DIFFICULTY = 0

    Game.simons.forEach(resizeSimon);

    resizeGrid()

    startMusic()
    resetInterval()
}

function addSimons() {
    let length = Game.simons.length
    for (let i = 0; i < length; i++) {
        Game.simons.push(Game.simons[0].clone())
    }
}


function resizeGrid() {
    document.getElementsByClassName('grid')[0].classList.remove('size' + getCount(-1))
    document.getElementsByClassName('grid')[0].classList.add('size' + getCount())
}

function allValidated() {
    const isValidated = simon => simon.isValidated
    return Game.simons.every(isValidated)
}

function anyFailed() {
    const isFailed = simon => simon.isFailed
    return Game.simons.some(isFailed)
}

function loop() {

    if (allValidated()) {
        Game.score++
        Game.DIFFICULTY += Game.MULTIPLIER
        resetInterval()
        Game.PLAYER.setRate(0.8 + Game.DIFFICULTY)
    }
    else if (anyFailed()) split()
    else Game.score--

    reset()
    update()
}

function reset() {
    const reset = simon => simon.reset()
    Game.simons.forEach(reset)
}

function setFirst() {
    const simonElement = document.getElementsByClassName('simon')[0]
    Game.simons.push(new Simon(simonElement, 0, 0))
}

function start() {
    document.getElementById('play')?.remove()
    setFirst()
    update()
    setTimeout(startMusic, 0)
    resetInterval()
}

function startMusic() {
    Game.PLAYER.play(Game.level)
    Game.PLAYER.setRate(0.8 + Game.DIFFICULTY)
}

function resetInterval() {
    clearInterval(Game.loop)
    Game.loop = setInterval(loop, Game.PLAYER.BEAT * 2 * (2 - (0.8 + Game.DIFFICULTY)))
}

function resizeSimon(simon) {
    simon.parent.classList.remove('simSize' + getCount(-1))
    simon.parent.classList.add('simSize' + getCount())
}

function displayScore() {
    const scoreElement = document.querySelector('.score')
    scoreElement.textContent = Game.score.toString()
}

function getCount(n=0) {
    return Math.pow(2, (Game.level + n))
}

document.getElementById('play')?.addEventListener('click', start);
