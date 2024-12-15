
export class Simon {

    #parent
    #validated
    #failed

    /**
     * Create a new Simon in the specified parent
     * @param {HTMLDivElement} parent
     */
    constructor(parent) {

        this.#parent = parent;
        this.#validated = false;
        this.#failed = false;

    }

    get isValidated() {
        return this.#validated
    }

    get isFailed() {
        return this.#failed
    }

    get parent() {
        return this.#parent
    }

    /**
     * The center element
     * @returns {HTMLDivElement}
     */
    get e0() {
        return this.#parent.getElementsByClassName('e0')[0];
    }

    /**
     * The top-left element
     * @returns {HTMLDivElement}
     */
    get e1() {
        return this.#getChoiceElement('e1');
    }

    /**
     * The top-right element
     * @returns {HTMLDivElement}
     */
    get e2() {
        return this.#getChoiceElement('e2');
    }

    /**
     * The bottom-right element
     * @returns {HTMLDivElement}
     */
    get e3() {
        return this.#getChoiceElement('e3');
    }

    /**
     * The bottom-left element
     * @returns {HTMLDivElement}
     */
    get e4() {
        return this.#getChoiceElement('e4');
    }

    #validate() {
        this.#validated = true;
        this.#setAllColor('rgb(67, 242, 33)');
    }

    #fail() {
        this.#failed = true;
        this.#setAllColor('rgb(235, 40, 40)');
    }

    /**
     * Get a child element from its name
     * @param name
     * @returns {Element}
     */
    #getChoiceElement(name) {
        return this.#parent.getElementsByClassName(name)[0]
    }

    #setChoiceElementColor(choiceElement, color) {
        choiceElement.style.backgroundColor = color
        //choiceElement[0].style.backgroundColor = color
        //choiceElement[1].style.backgroundColor = color
    }

    #setAllColor(color) {
        this.setElementColor('e0', color);
        this.setElementColor('e1', color);
        this.setElementColor('e2', color);
        this.setElementColor('e3', color);
        this.setElementColor('e4', color);
    }

    /**
     * Set the color for an element from its name
     * @param name
     * @param color
     */
    setElementColor(name, color) {
        switch (name) {
            case 'e0': this.e0.style.backgroundColor = color; break;
            case 'e1': this.#setChoiceElementColor(this.e1, color); break;
            case 'e2': this.#setChoiceElementColor(this.e2, color); break;
            case 'e3': this.#setChoiceElementColor(this.e3, color); break;
            case 'e4': this.#setChoiceElementColor(this.e4, color); break;
        }
    }

    /**
     * Get the others sides from choice
     * @param choice
     * @returns {string[]}
     */
    #getOthers(choice) {
        const filter = (element) => element !== choice
        return ['e1', 'e2', 'e3', 'e4'].filter(filter)
    }

    /**
     * Set the color for the center and chosen element
     * @param choice
     * @param color
     */
    #setChoiceColor(choice, color) {
        this.setElementColor('e0', color);
        this.setElementColor(choice, color);
    }

    /**
     * Set the choice
     * @param choice
     * @param color
     * @param colors
     */
    setChoice(choice, color, colors) {

        this.#setCallbacks(choice);
        this.#setChoiceColor(choice, color);
        this.#setOtherColors(choice, colors);
    }

    #setCallbacks(choice) {

        this.#getChoiceElement(choice).onclick = this.#validate.bind(this);

        const setOthers = element => this.#getChoiceElement(element).onclick = this.#fail.bind(this);
        this.#getOthers(choice).forEach(setOthers);

    }

    /**
     * Set the color for the other elements
     * @param choice
     * @param colors
     */
    #setOtherColors(choice, colors) {
        const setColor = (element, index) => this.setElementColor(element, colors[index])
        this.#getOthers(choice).forEach(setColor);
    }

    /**
     * Remove the simon
     */
    remove() {
        this.#parent.removeChild(this.#getChoiceElement('simon'));
    }

    /**
     * Remove the simon
     */
    clone() {
        parent = this.#parent.cloneNode(true)
        document.getElementsByClassName('grid')[0].appendChild(parent);
        return new Simon(parent);
    }

    reset() {
        this.#validated = false
        this.#failed = false
    }

}