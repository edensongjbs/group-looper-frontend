import * as Tone from 'tone'

export const establishTransportSettings = (tempo, timeSigNum, timeSigDenom, numBars) => {
    Tone.Transport.stop()
    Tone.Transport.loop = true
    Tone.Transport.bpm.value = tempo
    Tone.Transport.timeSignature = [timeSigNum, timeSigDenom]
    Tone.Transport.loopEnd = `${numBars}m`
    Tone.Transport.loopStart = 0
}