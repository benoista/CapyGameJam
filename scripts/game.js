
import {Simon} from "./class_simon.js";
import {Colors} from "./colors.js"
import {player} from "/src/audio.js"
import * as Tone from "tone";
const simons = []


const DIFFICULTY = 4;
const TIME = 659 * DIFFICULTY
let SCORE = 0

function generateChoice() {
    return ['e1', 'e2', 'e3', 'e4'][Math.floor(Math.random() * 4)];
}

function generateOtherColors(color) {
    return [
        Colors.generateColorVariation(color, 20 * DIFFICULTY),
        Colors.generateColorVariation(color, 20 * DIFFICULTY),
        Colors.generateColorVariation(color, 20 * DIFFICULTY)
    ]
}

function update() {

    const color = Colors.generateRandomColor()
    const otherColors = generateOtherColors(color)

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

    if (allValidated()) SCORE++
    else if (anyFailed()) split()
    else SCORE--

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
    setFirst()
    update()
    setTimeout(startMusic, 900)
    setInterval(loop, TIME)
}

async function startMusic() {
    await Tone.start();
    player.playbackRate = 2 / DIFFICULTY
    player.toDestination().start();
}

document.getElementById('play')?.addEventListener('click', start);
