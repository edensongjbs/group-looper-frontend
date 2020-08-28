import * as Tone from 'tone'
// import stopAll

export default (state = {playing: false}, action) => {
    switch (action.type) {
        case 'START_MUSIC':
            Tone.start()
            Tone.Transport.start(Tone.now())
            return {playing: true}
        case 'STOP_MUSIC':
            Tone.Transport.stop(Tone.now())
            return {playing: false}
        default:
            return state
    }
}