import * as Tone from 'tone'

export const establishTransportSettings = (tempo, timeSigNum, timeSigDenom, numBars) => {
    Tone.Transport.stop()
    Tone.Transport.loop = true
    Tone.Transport.loopEnd = (60/tempo)*numBars*timeSigNum       //`${numBars}m`
    // Tone.Transport.bpm.value = tempo
    // Tone.Transport.timeSignature = [timeSigNum, timeSigDenom]
    Tone.Transport.loopStart = 0
    console.log('after', Tone.Transport.bpm.value, Tone.Transport._loopEnd, Tone.Transport.blockTime)
}