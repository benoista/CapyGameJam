
export class Colors {

    // Function to generate a random color
    static generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Function to generate color variations
    static generateColorVariation(baseColor, range) {
        const variation = Math.floor(Math.random() * (range * 2)) - range
        return this.editColor(baseColor, variation)
    }

    // Function to generate color variations
    static editColor(baseColor, value) {
        const [r, g, b] = baseColor.match(/\d+/g).map(Number);
        const newColor = [
            Math.min(255, Math.max(0, r + value)),
            Math.min(255, Math.max(0, g + value)),
            Math.min(255, Math.max(0, b + value))
        ];
        return `rgb(${newColor.join(', ')})`;
    }

    static daltonianFriendlyColors = [
        'rgb(0, 114, 178)',   // Strong Blue
        'rgb(213, 94, 0)',    // Vermilion
        'rgb(0, 158, 115)',   // Bluish Green
        'rgb(230, 159, 0)',   // Orange
        'rgb(86, 180, 233)',  // Sky Blue
        'rgb(204, 121, 167)', // Reddish Purple
        'rgb(240, 228, 66)',  // Yellow
        'rgb(0, 0, 0)'        // Black
    ];



    // Function to generate a random color from the predefined palette
    static generateRandomColorDaltonism() {
        const randomIndex = Math.floor(Math.random() * this.daltonianFriendlyColors.length);
        return this.daltonianFriendlyColors[randomIndex];
    }

    // Function to generate color variations in Daltonism MODE
    static generateColorVariationDaltonism(baseColor) {
        let variationColor;
        do {
            const randomIndex = Math.floor(Math.random() * this.daltonianFriendlyColors.length);
            variationColor = this.daltonianFriendlyColors[randomIndex];
        } while (variationColor === baseColor);
        return variationColor;
    }





}