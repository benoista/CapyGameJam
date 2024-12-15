import * as Tone from 'tone';


export const PLAYERS = [
    new Tone.Player({url: "/audio/musics/level"+ 1 +".wav", loop: true}),
    new Tone.Player({url: "/audio/musics/level"+ 2 +".wav", loop: true}),
    new Tone.Player({url: "/audio/musics/level"+ 4 +".wav", loop: true}),
    new Tone.Player({url: "/audio/musics/level"+ 8 +".wav", loop: true}),
    new Tone.Player({url: "/audio/musics/level"+ 16 +".wav", loop: true}),
    new Tone.Player({url: "/audio/musics/level"+ 32 +".wav", loop: true}),
    new Tone.Player({url: "/audio/musics/level"+ 64 +".wav", loop: true}),
]

export class Player {

    BEAT = 750;

    #player = null

    constructor() {
        this.#player = new Tone.Player();
    }

    play(level) {
        if (this.#player !== null) this.#player.stop()
        this.#player = PLAYERS[level];
        this.#player.toDestination().start()
    }

    setRate(value) {
        this.#player.playbackRate = value;
    }

}


