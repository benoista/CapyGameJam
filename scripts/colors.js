
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
        const [r, g, b] = baseColor.match(/\d+/g).map(Number);
        const variation = Math.floor(Math.random() * (range * 2)) - range
        const newColor = [
            Math.min(255, Math.max(0, r + variation)),
            Math.min(255, Math.max(0, g + variation)),
            Math.min(255, Math.max(0, b + variation))
        ];
        return `rgb(${newColor.join(', ')})`;
    }

}