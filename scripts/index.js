
import {Simon} from "./class_simon.js";
import {Colors} from "./colors.js"

const simonElement = document.getElementsByClassName('simon')[0]

const simons = [new Simon(simonElement, 0, 0)]

const DIFFICULTY = 50;


function generateChoice() {
    return ['e1', 'e2', 'e3', 'e4'][Math.floor(Math.random() * 4)];
}

function update() {

    const choice = generateChoice()
    const color = Colors.generateRandomColor()
    const colors = [
        Colors.generateColorVariation(color, DIFFICULTY),
        Colors.generateColorVariation(color, DIFFICULTY),
        Colors.generateColorVariation(color, DIFFICULTY)
    ]

    simons.forEach(simon =>
    {
        simon.setChoice(choice, () => update(), () => duplicate())
        simon.setChoiceColor(choice, color);
        simon.setOtherColors(choice, colors)
    }
    )

}

function duplicate() {
    length = simons.length
    for (let i = 0; i < length; i++) {
        simons.push(simons[0].clone())
    }
    update()
}
update()