import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as Tone from 'tone'

const synth = new Tone.PolySynth(Tone.Synth).toDestination()

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

let soundEvents = []

const playNote = (noteName) => {
  const now = Tone.now()
  // console.log(Tone.Transport)
  synth.triggerAttack(noteName, now)
  synth.triggerRelease(now+0.5)
}

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
  soundEvents.push({type:"attack", pitch: noteName, loop: loopedNote, time:startTime})
}



const scheduleRelease = (noteName, endTime) => {
  const loopEnd = new Tone.Loop(time => {
    synth.triggerRelease(noteName, time)
  }, 2).start(endTime) 
  soundEvents.push({type:"release", loop: loopEnd, time:endTime})
}

window.addEventListener("keydown", e => {
  if (e.repeat) {return}
  // playNote(notes[e.key] || "C4")
  scheduleAttack(notes[e.key] || "C4", Tone.now()%2)
})

window.addEventListener("keyup", e => {
  // playNote(notes[e.key] || "C4")
  scheduleRelease(notes[e.key] || "C4", Tone.now()%2)
})



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

function App() {
  Tone.start()
  Tone.Transport.start()
  return (
    <div className="App">
      <button onClick={() => stopAll()}>Stop</button>
      <button onClick={() => Tone.Transport.start(Tone.now())}>Start</button>
      <button onClick={() => console.log(soundEvents)}>Log Events</button>
      <button onClick={() => {
        soundEvents.forEach(se => se.loop.dispose())
        soundEvents = []
      }}>Clear Events</button>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
