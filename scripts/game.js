
import {Simon} from "./class_simon.js";
import {Colors} from "./colors.js"
import {player} from "/scripts/audio.js"
import * as Tone from "tone";

const POS = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 0],
    [3, 0],
    [2, 1],
    [3, 1],
    [0, 2],
    [1, 2],
    [0, 3],
    [1, 3],
    [2, 2],
    [3, 2],
    [2, 3],
    [3, 3],
]




class Game {
    static DIFFICULTY = 4;
    static TIME = 659 * this.DIFFICULTY
    static SCORE = 0
    static LEVEL = 0
    static DALTONISME = false
    static SIMONS = []
}

function generateChoice() {
    return ['e1', 'e2', 'e3', 'e4'][Math.floor(Math.random() * 4)];
}

function generateOtherColors(color) {
    return [
        Colors.generateColorVariation(color, 20 * Game.DIFFICULTY),
        Colors.generateColorVariation(color, 20 * Game.DIFFICULTY),
        Colors.generateColorVariation(color, 20 * Game.DIFFICULTY)
    ]
}
function generateOtherColorsDaltonism(color) {
    return [
        Colors.generateColorVariationDaltonism(color, 20 * Game.DIFFICULTY),
        Colors.generateColorVariationDaltonism(color, 20 * Game.DIFFICULTY),
        Colors.generateColorVariationDaltonism(color, 20 * Game.DIFFICULTY)
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
    Game.SIMONS.forEach(setChoice)
}

function setAnimColor(color) {
    const root = document.querySelector(':root')
    root.style.setProperty('--shadow-color', color);
    //root.style.setProperty('--border-color', Colors.editColor(color, 150));
}

function split() {
    let length = Game.SIMONS.length
    for (let i = 0; i < length; i++) {
        Game.SIMONS.push(Game.SIMONS[0].clone())
    }
    Game.LEVEL++
    Game.SIMONS.forEach(resizeSimon);
    document.getElementsByClassName('grid')[0].classList.remove('size' + getCount(-1))
    document.getElementsByClassName('grid')[0].classList.add('size' + getCount())
}

function allValidated() {
    const isValidated = simon => simon.isValidated
    return Game.SIMONS.every(isValidated)
}

function anyFailed() {
    const isFailed = simon => simon.isFailed
    return Game.SIMONS.some(isFailed)
}

function loop() {

    if (allValidated()) Game.SCORE++
    else if (anyFailed()) split()
    else Game.SCORE--

    reset()
    update()
}

function reset() {
    const reset = simon => simon.reset()
    Game.SIMONS.forEach(reset)
}

function setFirst() {
    const simonElement = document.getElementsByClassName('simon')[0]
    Game.SIMONS.push(new Simon(simonElement, 0, 0))
}

function start() {
    document.getElementById('play')?.remove()
    setFirst()
    update()
    setTimeout(startMusic, 900)
    setInterval(loop, Game.TIME)
}

async function startMusic() {
    await Tone.start();
    player.playbackRate = 2 / Game.DIFFICULTY
    player.toDestination().start();
}

function resizeSimon(simon) {
    simon.parent.classList.remove('simSize' + getCount(-1))
    simon.parent.classList.add('simSize' + getCount())
}

function displayScore() {
    const scoreElement = document.querySelector('.score')
    scoreElement.textContent = Game.SCORE.toString()
}

function getCount(n=0) {
    return Math.pow(2, (Game.LEVEL + n))
}

document.getElementById('play')?.addEventListener('click', start);
