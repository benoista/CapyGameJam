import * as Tone from 'tone';


const player = new Tone.Player({
    url: "/assets/music.mp3",
    loop: true,
    autostart: true,
});

const UIAudio = new Tone.Sampler({
    urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "/assets/",
}).toDestination();


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

export function increasePlaybackRate(value: number) {
    player.playbackRate += value;
}

export function decreasePlaybackRate(value: number) {
    player.playbackRate -= value;
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





