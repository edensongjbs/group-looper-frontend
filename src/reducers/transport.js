import * as Tone from 'tone'
// import stopAll

export default (state = {disabled: false, playing: false, timeNow: 0, tempoCoeff:1}, action) => {
    switch (action.type) {
        case 'START_MUSIC':
            Tone.start()
            console.log(Tone.Transport.now())
            Tone.Transport.start(Tone.now())
            return {playing: true, timeNow: Tone.Transport.immediate()}
        case 'STOP_MUSIC':
            Tone.Transport.stop(Tone.now())
            console.log(Tone.Transport.now())
            return {playing: false, currentTransportTime: Tone.now()}
        case 'DISABLE_KEYS':
            return {...state, disabled:true}
        case 'ENABLE_KEYS':
            return {...state, disabled:false}
        default:
            return state
        
    }
}