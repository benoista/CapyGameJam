document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play');
    const scorePanel = document.getElementById('scorePanel');
    const closePanelButton = document.getElementById('closePanel');

    playButton.addEventListener('click', () => {
        scorePanel.style.display = 'block';
    });

    closePanelButton.addEventListener('click', () => {
        scorePanel.style.display = 'none';
    });
});
