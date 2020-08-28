import React from 'react'
import * as Tone from 'tone'
import * as uuid from 'uuid'
import * as Global from '../settings/global_settings'

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

export default class KeyboardArea extends React.Component {
    
    // composition = {
    //     numBeatsPerBeat:4,
    //     numBars:4,
    // }
      
      
      
    offset = Tone.context.lookAhead
    
    soundEvents = []
    ready = true

    synth = new Tone.PolySynth(Tone.Synth).toDestination()
    
    playNote = (noteName) => {
        console.log(this.ready)
        if (!this.ready) {return}
        const now = Tone.now()
        const reallyNow = Tone.context.currentTime
        this.synth.triggerAttack(noteName, now)
        const eventId = Tone.Transport.scheduleRepeat(() => {
            this.synth.triggerAttack(noteName)
            }, 2, now-this.offset)
        this.soundEvents.push({id: eventId, instrument: this.synth, type:"attack", pitch: noteName, time:reallyNow})
    }
    
    releaseNote = (noteName) => {
        const now = Tone.now()
        const reallyNow = Tone.context.currentTime
        // console.log(Tone.Transport)
        this.synth.triggerRelease(noteName, now)
        const eventId = Tone.Transport.scheduleRepeat(() => {
            this.synth.triggerRelease(noteName)
            },  2, now-this.offset)
        this.soundEvents.push({id: eventId, instrument: this.synth, type:"release", pitch: noteName, time:reallyNow})
    }
    
    // const scheduleAttack = (noteName, startTime) => {
    // const loopedNote = new Tone.Loop(time => {
    //     synth.triggerAttack(noteName, time)
    // }, 2).start(startTime)
    // soundEvents.push({instrument: synth, type:"attack", pitch: noteName, loop: loopedNote, time:startTime})
    // }
    
    // const scheduleRelease = (noteName, endTime) => {
    // const loopEnd = new Tone.Loop(time => {
    //     synth.triggerRelease(noteName, time)
    // }, 2).start(endTime) 
    // soundEvents.push({instrument: synth, type:"release", loop: loopEnd, pitch: noteName, time:endTime})
    // }
    
    componentDidMount = () => {
        window.addEventListener("keydown", e => {
            if (e.repeat) {return}
            this.playNote(Global.notes[e.key] || "C4")
        })
            
        window.addEventListener("keyup", e => {
            this.releaseNote(Global.notes[e.key] || "C4")
        })
    }
    
    //Move out
    // createNewLayer = (addLayer) => {
    //     const id = uuid()
    //     addLayer({id, noteEvents: [...soundEvents]})
    //     soundEvents.forEach(se => {
    //         Tone.Transport.clear(se.id)
    //         })
    //     soundEvents = []
    // }
    
    // Moveout
    // stopAll = () => {
    // soundEvents.forEach(se => {
    //     if (se.type==="attack") {
    //     synth.triggerRelease(se.pitch)
    //     }
    //     })
    //     Tone.Transport.stop(Tone.now())
    // }


    render() {
        return(
            <div className="keyboard-area">
                This is the Keyboard Area
            </div>
        )
    }
}