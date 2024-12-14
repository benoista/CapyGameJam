import * as Tone from 'tone';

document.addEventListener('click', async () => {
    await Tone.start();
});


const player = new Tone.Player({
    url: "/audio/music.mp3",
    loop: true,
    autostart: true,
});

const uiSamples = new Tone.Sampler({
    urls: {
        "C4": "/audio/ui/click1.ogg",
        "D4": "/audio/ui/hover.mp3",
    },
    release: 1,
    baseUrl: "/audio/ui/",
}).toDestination();

const click = new Tone.Player({
    url: "/audio/ui/click1.ogg",
    loop: false,
    autostart: false,
}).toDestination();



document.getElementById('play')?.addEventListener('click', async () => {
    player.playbackRate = 2;
    player.toDestination().start();
});

document.getElementById('stop')?.addEventListener('click', () => {
    player.stop();
});

document.getElementById('pause')?.addEventListener('click', () => {
    player.stop();
});

let buttons = document.getElementsByTagName('button');

buttons.item(0).addEventListener('click', () => {
    playButtonClick();
});
for (let i = 0;  i < buttons.length; i++){
    buttons.item(i).addEventListener('click', () => {
        playButtonClick();
    });
}

export function increasePlaybackRate(value) {
    player.playbackRate += value;
}

export function decreasePlaybackRate(value) {
    player.playbackRate -= value;
}

export function resetPlaybackRate() {
    player.playbackRate = 1;
}

export function setMasterVolume(volume) {
    Tone.getDestination().volume.value = volume;
}

export function setUIVolume(volume) {
    uiSamples.volume.value = volume;
}

export function setMusicVolume(volume) {
    player.volume.value = volume;
}

export function playButtonClick(){
    click.start();
}




