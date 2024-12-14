// Function to generate a random color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to generate color variations
function generateColorVariation(baseColor, factor) {
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);
    const newColor = [
        Math.min(255, Math.max(0, r + factor)),
        Math.min(255, Math.max(0, g + factor)),
        Math.min(255, Math.max(0, b + factor))
    ];
    return `rgb(${newColor.join(', ')})`;
}