// Reference the checkboxes
const daltoCheckbox = document.getElementById('dalto');
const hardcoreCheckbox = document.getElementById('hardcore');

// Function to save the checkbox state to localStorage
function saveCheckboxState(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    localStorage.setItem(checkboxId, checkbox.checked); // Save the state (true/false)
}

// Event listeners for checkboxes
daltoCheckbox.addEventListener('change', () => saveCheckboxState('dalto'));
hardcoreCheckbox.addEventListener('change', () => saveCheckboxState('hardcore'));

// Restore checkbox states on page load
window.addEventListener('load', () => {
    daltoCheckbox.checked = localStorage.getItem('dalto') === 'true'; // Convert string to boolean
    hardcoreCheckbox.checked = localStorage.getItem('hardcore') === 'true';
});