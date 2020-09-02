import * as Tone from 'tone'

export const establishTransportSettings = (tempo, timeSigNum, timeSigDenom, numBars) => {
    console.log('establishing settings', tempo, timeSigNum, timeSigDenom, numBars)
    console.log('before', Tone.Transport.bpm.value, Tone.Transport._loopEnd, Tone.Transport.blockTime)
    Tone.Transport.stop()
    Tone.Transport.loop = true
    Tone.Transport.loopEnd = (60/tempo)*numBars*timeSigNum       //`${numBars}m`
    // Tone.Transport.bpm.value = tempo
    // Tone.Transport.timeSignature = [timeSigNum, timeSigDenom]
    Tone.Transport.loopStart = 0
    console.log('after', Tone.Transport.bpm.value, Tone.Transport._loopEnd, Tone.Transport.blockTime)
}