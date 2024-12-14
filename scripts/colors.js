
function randPosNeg() {
    return (Math.random() > 0.5)?-1:1
}


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

        const R = Math.floor(Math.random() * range + range / 2) * randPosNeg()
        const G = Math.floor(Math.random() * range + range / 2) * randPosNeg()
        const B = Math.floor(Math.random() * range + range / 2) * randPosNeg()

        const [r, g, b] = baseColor.match(/\d+/g).map(Number);
        const newColor = [
            Math.min(255, Math.max(0, r + R)),
            Math.min(255, Math.max(0, g + G)),
            Math.min(255, Math.max(0, b + B))
        ];
        return `rgb(${newColor.join(', ')})`;
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

}