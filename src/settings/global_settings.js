import * as Tone from 'tone'
import SampleLibrary from '../sampler/Tonejs-Instruments'

Tone.context.lookAhead=0.01
Tone.context.updateInterval=0.001
export const vol = new Tone.Volume(0).toDestination()

// const piano = SampleLibrary.load({instruments:"piano", onload:()=>ready=true}).connect(vol)

const phraseLength = 400

export const notes = {
  a:"C4",
  s:"D4",
  d:"E4",
  f:"F4",
  g:"G4",
  h:"A4",
  j:"B4",
  k:"C5"
}

// const metronomePart = new Tone.Part((time, note)=>{
//     synth.triggerAttackRelease(note, 0.05, time)
//   }, [[0, "C7"],[0.5, "G6"], [1.0, "G6"], [1.5, "G6"]]).start(0)
//   part.loop=true