import * as Tone from 'tone'

Tone.context.lookAhead=0.01
Tone.context.updateInterval=0.001
export const vol = new Tone.Volume(0).toDestination()

// const piano = SampleLibrary.load({instruments:"piano", onload:()=>ready=true}).connect(vol)

// export const baseUrl = "http://localhost:3000/"
export const baseUrl = "https://guarded-beyond-34371.herokuapp.com/"
export const wsUrl = "wss://guarded-beyond-34371.herokuapp.com/cable"



const phraseLength = 400

export const notes = {
  a:"C4",
  w:"C#4",
  e:"D#4",
  t:"F#4",
  y:"G#4",
  u:"A#4",
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
//   }, [[0, "C5"],[0.5, "A4"], [1.0, "A4"], [1.5, "A4"]]).start(0)
// part.loop=true