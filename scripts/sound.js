const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');
const audioElement = document.getElementById('audio-element');
const playPauseButton = document.getElementById('play-pause');

const savedVolume = localStorage.getItem('volume');
if (savedVolume) {
    volumeSlider.value = savedVolume;
    volumeValue.textContent = `${savedVolume}%`;
    audioElement.volume = savedVolume / 100;
}

volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    volumeValue.textContent = `${volume}%`;
    audioElement.volume = volume / 100;

    localStorage.setItem('volume', volume);
});

playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audioElement.pause();
        playPauseButton.textContent = 'Play';
    }
});
