
import {Simon} from "./class_simon.js";
import {Colors} from "./colors.js"
import {player} from "/scripts/audio.js"
import * as Tone from "tone";
const simons = []


const SIM_SIZES = [
    'simSize1',
    'simSize2',
    'simSize4',
    'simSize8',
    'simSize16',
    'simSize32'
]

const SIZES = [
    'size1',
    'size2',
    'size4',
    'size8',
    'size16',
    'size32'
]

class Game {

    static DIFFICULTY = 4;
    static TIME = 659 * this.DIFFICULTY
    static SCORE = 0
    static LEVEL = 0
    static DALTONISME = false
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

    displayScore()
    let color = Colors.generateRandomColor()
    let otherColors = generateOtherColors(color)

    if (Game.DALTONISME) {
        color = Colors.generateRandomColorDaltonism()
        otherColors = generateOtherColorsDaltonism(color)
    }
    
    setAnimColor(color)

    const setChoice = simon => simon.setChoice(generateChoice(), color, otherColors)
    simons.forEach(setChoice)
}

function setAnimColor(color) {
    const root = document.querySelector(':root')
    root.style.setProperty('--shadow-color', color);
    //root.style.setProperty('--border-color', Colors.editColor(color, 150));
}

function split() {
    length = simons.length
    for (let i = 0; i < length; i++) simons.push(simons[0].clone())
    Game.LEVEL++
    simons.forEach(resizeSimon);
    document.getElementsByClassName('grid')[0].classList.remove(SIZES[Game.LEVEL-1])
    document.getElementsByClassName('grid')[0].classList.add(SIZES[Game.LEVEL])

}

function allValidated() {
    const isValidated = simon => simon.isValidated
    return simons.every(isValidated)
}

function anyFailed() {
    const isFailed = simon => simon.isFailed
    return simons.some(isFailed)
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
    simons.forEach(reset)
}

function setFirst() {
    const simonElement = document.getElementsByClassName('simon')[0]
    simons.push(new Simon(simonElement))
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
    simon.parent.classList.remove(SIM_SIZES[Game.LEVEL-1])
    simon.parent.classList.add(SIM_SIZES[Game.LEVEL])
}

function displayScore() {
    const scoreElement = document.querySelector('.score')
    scoreElement.textContent = "Your score : " + Game.SCORE.toString()
}

document.getElementById('play')?.addEventListener('click', start);
