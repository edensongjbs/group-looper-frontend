import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as Tone from 'tone'
import {connect} from 'react-redux'
import { addLayer } from './actions/layer';
import { v4 as uuid } from 'uuid'
import Layers from './containers/Layers'
import SampleLibrary from './sampler/Tonejs-Instruments'

Tone.context.lookAhead=0.01
Tone.context.updateInterval=0.001
const vol = new Tone.Volume(0).toDestination()
const synthex = new Tone.PolySynth(Tone.Synth).toDestination()
const synth = SampleLibrary.load({instruments:"piano", onload:()=>ready=true}).connect(vol)
let ready = false
// Tone.Buffer.on('load', () => {
//   piano.toMaster();
//   piano.triggerAttack("A3")
// })

// const sampler = new Tone.Sampler({
//   urls: {
//     A1: "A1.mp3"
//   },
//   baseUrl: "./samples/piano/",
//   onload: () => {
//     console.log("sampler is ready!")
//     sampler.triggerAttackRelease("C1", 1)
//   }
// }).toDestination()



const composition = {
  numBeatsPerBeat:4,
  numBars:4,

}

const phraseLength = 400

const notes = {
  a:"C4",
  s:"D4",
  d:"E4",
  f:"F4",
  g:"G4",
  h:"A4",
  j:"B4",
  k:"C5"
}

let offset = Tone.context.lookAhead

let soundEvents = []

// const playNote = (noteName) => {
//   console.log(ready)
//   if (!ready) {return}
//   const now = Tone.now()
//   const reallyNow = Tone.context.currentTime
//   synth.triggerAttack(noteName, now)
//   const eventId = Tone.Transport.scheduleRepeat(() => {
//     synth.triggerAttack(noteName)
//     }, 2, now-offset)
//   soundEvents.push({id: eventId, instrument: synth, type:"attack", pitch: noteName, time:reallyNow})
// }

const playNote = (noteName) => {}

const releaseNote = (noteName) => {
  const now = Tone.now()
  const reallyNow = Tone.context.currentTime
  // console.log(Tone.Transport)
  synth.triggerRelease(noteName, now)
  const eventId = Tone.Transport.scheduleRepeat(() => {
    synth.triggerRelease(noteName)
    },  2, now-offset)
  soundEvents.push({id: eventId, instrument: synth, type:"release", pitch: noteName, time:reallyNow})
}

// const part = new Tone.Part((time, note)=>{
//   synth.triggerAttackRelease(note, 0.05, time)
// }, [[0, "C7"],[0.5, "G6"], [1.0, "G6"], [1.5, "G6"]]).start(0)
// part.loop=true

// const scheduleNote = (noteName, startTime) => {
//   console.log(startTime)
//   const loopedNote = new Tone.Loop(time => {
//     synth.triggerAttackRelease(noteName, 0.5, time)
//   }, 2).start(startTime)
// }

const scheduleAttack = (noteName, startTime) => {
  const loopedNote = new Tone.Loop(time => {
    synth.triggerAttack(noteName, time)
  }, 2).start(startTime)
  soundEvents.push({instrument: synth, type:"attack", pitch: noteName, loop: loopedNote, time:startTime})
}



const scheduleRelease = (noteName, endTime) => {
  const loopEnd = new Tone.Loop(time => {
    synth.triggerRelease(noteName, time)
  }, 2).start(endTime) 
  soundEvents.push({instrument: synth, type:"release", loop: loopEnd, pitch: noteName, time:endTime})
}

window.addEventListener("keydown", e => {
  if (e.repeat) {return}
   playNote(notes[e.key] || "C4")
  // scheduleAttack(notes[e.key] || "C4", Tone.now()%2)
})

window.addEventListener("keyup", e => {
  releaseNote(notes[e.key] || "C4")
  // scheduleRelease(notes[e.key] || "C4", Tone.now()%2)
})

const createNewLayer = (addLayer) => {
  const id = uuid()
  // debugger
  addLayer({id, noteEvents: [...soundEvents]})
  soundEvents.forEach(se => {
    Tone.Transport.clear(se.id)
    })
  soundEvents = []
}



// class App {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;


const stopAll = () => {
  soundEvents.forEach(se => {
    if (se.type==="attack") {
      synth.triggerRelease(se.pitch)
    }
  })
  Tone.Transport.stop(Tone.now())
}

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';


//Old Render:

// (<button onClick={() => stopAll()}>Stop</button>
// <button onClick={() => {
//   Tone.start()
//   Tone.Transport.start(Tone.now())
// }}>Start</button>
// <button onClick={() => console.log(soundEvents)}>Log Events</button>
// <button onClick={() => {
//   soundEvents.forEach(se => se.loop.dispose())
//   soundEvents = []
// }}>Clear Events</button>
//  <button onClick={() => {
//   createNewLayer(props.addLayer)
// }}>Export To New Layer</button>
// <Layers/>)

function App(props) {
  Tone.start()
  Tone.Transport.start()
  return (
    <div className="wrapper">
      <header className="header">
        <h1>Group Looper</h1>
      </header>
      <div className="transport">This is the Transport</div>
      <div className="keyboard-area">This is the Keyboard Area</div>
      <div className="sidebar">This is the Sidebar</div>
      <footer className="footer">All Rights Reserved</footer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return { addLayer: (layer) => dispatch(addLayer(layer)) }
}


export default connect(null, mapDispatchToProps)(App);
