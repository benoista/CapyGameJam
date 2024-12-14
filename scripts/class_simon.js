
export class Simon {

    parent

    /**
     * Create a new Simon in the specified parent
     * @param {HTMLDivElement} parent
     * @param row
     * @param column
     */
    constructor(parent, row, column) {
        this.parent = parent;
        this.parent.style.row = row;
        this.parent.style.column = column;
    }

    /**
     * The center element
     * @returns {HTMLDivElement}
     */
    get e0() {
        return this.#getElement('e0');
    }

    /**
     * The top-left element
     * @returns {HTMLDivElement}
     */
    get e1() {
        return this.#getElement('e1');
    }

    /**
     * The top-right element
     * @returns {HTMLDivElement}
     */
    get e2() {
        return this.#getElement('e2');
    }

    /**
     * The bottom-right element
     * @returns {HTMLDivElement}
     */
    get e3() {
        return this.#getElement('e3');
    }

    /**
     * The bottom-left element
     * @returns {HTMLDivElement}
     */
    get e4() {
        return this.#getElement('e4');
    }

    /**
     * Get a child element from its name
     * @param name
     * @returns {Element}
     */
    #getElement(name) {
        return this.parent.getElementsByClassName(name)[0];
    }

    /**
     * Set the color for an element from its name
     * @param name
     * @param color
     */
    #setElementColor(name, color) {
        switch (name) {
            case 'e0': this.e0.style.backgroundColor = color; break;
            case 'e1': this.e1.style.backgroundColor = color; break;
            case 'e2': this.e2.style.backgroundColor = color; break;
            case 'e3': this.e3.style.backgroundColor = color; break;
            case 'e4': this.e4.style.backgroundColor = color; break;
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
    setChoiceColor(choice, color) {
        this.#setElementColor('e0', color);
        this.#setElementColor(choice, color);
    }

    /**
     * Set the choice
     * @param choice
     * @param successCallback
     * @param failCallback
     */
    setChoice(choice, successCallback, failCallback) {

        this.#getElement(choice).onclick = successCallback;

        const setOthers = element => this.#getElement(element).onclick = failCallback;
        this.#getOthers(choice).forEach(setOthers);
    }

    /**
     * Set the color for the other elements
     * @param choice
     * @param colors
     */
    setOtherColors(choice, colors) {
        const setColor = (element, index) => this.#setElementColor(element, colors[index])
        this.#getOthers(choice).forEach(setColor);
    }

    /**
     * Remove the simon
     */
    remove() {
        this.parent.removeChild(this.#getElement('simon'));
    }

    /**
     * Remove the simon
     */
    clone(row, column) {
        parent = this.parent.cloneNode(true)
        document.body.appendChild(parent);
        return new Simon(parent, row, column);
    }

}