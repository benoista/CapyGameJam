import * as Tone from 'tone';


export const player = new Tone.Player({
    url: "/audio/music.mp3",
    loop: true,
    autostart: true,
});

export function increasePlaybackRate(value) {
    player.playbackRate += value;
}

export function decreasePlaybackRate(value) {
    player.playbackRate -= value;
}

export function resetPlaybackRate() {
    player.playbackRate = 1;
}

export function setVolume(volume) {
    player.volume.value = volume;
}

export function playClicked() {
    player.start();
}





