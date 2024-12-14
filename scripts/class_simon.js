class Simon {

    parent: HTMLDivElement

    /**
     * Create a new Simon in the specified parent
     * @param {HTMLDivElement} parent
     */
    constructor(parent: HTMLDivElement) {
        this.parent = parent;
    }

    /**
     * The center element
     * @returns {HTMLDivElement}
     */
    get e0(): HTMLDivElement {
        return this.#getElement('e0');
    }

    /**
     * The top-left element
     * @returns {HTMLDivElement}
     */
    get e1(): HTMLDivElement {
        return this.#getElement('e1');
    }

    /**
     * The top-right element
     * @returns {HTMLDivElement}
     */
    get e2(): HTMLDivElement {
        return this.#getElement('e2');
    }

    /**
     * The bottom-right element
     * @returns {HTMLDivElement}
     */
    get e3(): HTMLDivElement {
        return this.#getElement('e3');
    }

    /**
     * The bottom-left element
     * @returns {HTMLDivElement}
     */
    get e4(): HTMLDivElement {
        return this.#getElement('e4');
    }

    /**
     * Get a child element from its tag
     * @param tag
     * @returns {Element}
     */
    #getElement(tag: string): HTMLDivElement {
        return this.parent.getElementsByTagName(tag)[0];
    }

    /**
     * Set the color for an element from its tag
     * @param tag
     * @param color
     */
    #setElementColor(tag: string, color: string): void {
        switch (tag) {
            case 'e0': this.e0.style.backgroundColor = color; break;
            case 'e1': this.e1.style.backgroundColor = color; break;
            case 'e2': this.e2.style.backgroundColor = color; break;
            case 'e3': this.e3.style.backgroundColor = color; break;
            case 'e4': this.e4.style.backgroundColor = color; break;
        }
    }

    #getOthers(choice: string): Array<string> {
        const filter = (element) => element !== choice
        return ['e1', 'e2', 'e3', 'e4'].filter(filter)
    }

    /**
     * Set the color for the center and chosen element
     * @param choice
     * @param color
     */
    setChoiceColor(choice: string, color: string): void {
        this.#setElementColor('e0', color);
        this.#setElementColor(choice, color);
    }

    /**
     *
     * @param choice
     * @param successCallback
     * @param failCallback
     */
    setChoice(choice: string, successCallback: function, failCallback: function): void {

        this.#getElement(choice).onclick = successCallback;

        const setOthers = element => element.onclick = failCallback;
        this.#getOthers().forEach(setOthers);
    }

    /**
     * Set the color for the other elements
     * @param choice
     * @param colors
     */
    setOtherColors(choice: string, colors: Array<string>): void {
        const setColor = (element, index) => this.#setElementColor(element, colors[index])
        this.#getOthers().forEach(setColor);
    }

    /**
     * Remove the simon
     */
    remove(): void {
        this.parent.removeChild(this.#getElement('simon'));
    }

}