import * as Tone from 'tone';


const player = new Tone.Player({
    url: "/assets/music.mp3",
    loop: true,
    autostart: true,
});



document.getElementById('play')?.addEventListener('click', async () => {
    await Tone.start();
    player.playbackRate = 2;
    player.toDestination().start();
});

document.getElementById('stop')?.addEventListener('click', () => {
    player.stop();
});

document.getElementById('pause')?.addEventListener('click', () => {
    player.stop();
});

export function increasePlaybackRate() {
    player.playbackRate += 0.1;
}

export function decreasePlaybackRate() {
    player.playbackRate -= 0.1;
}

export function resetPlaybackRate() {
    player.playbackRate = 1;
}

export function setVolume(volume: number) {
    player.volume.value = volume;
}

export function playClicked() {
    player.start();
}





