import * as Tone from 'tone'

export const establishTransportSettings = (tempo, timeSigNum, timeSigDenom, numBars) => {
    Tone.Transport.stop()
    Tone.Transport.loop = true
    Tone.Transport.loopEnd = (60/tempo)*numBars*timeSigNum       //`${numBars}m`
    // Tone.Transport.bpm.value = tempo
    // Tone.Transport.timeSignature = [timeSigNum, timeSigDenom]
    Tone.Transport.loopStart = 0
}