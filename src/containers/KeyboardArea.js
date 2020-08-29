import React from 'react'
import * as Tone from 'tone'
import * as uuid from 'uuid'
import * as Global from '../settings/global_settings'
import { connect } from 'react-redux'
import { loadInstrument } from '../actions/instrument'

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

class KeyboardArea extends React.Component {
    
    // composition = {
    //     numBeatsPerBeat:4,
    //     numBars:4,
    // }
      
    eventListeners = [] 
    synth = null  
    offset = Tone.context.lookAhead
    
    // soundEvents = []
    ready = false

    // synth = new Tone.PolySynth(Tone.Synth).toDestination()

    // synth = loadInstrument(this.props.instrumentName, this) //sending this to reference ready in callBack
    
    playNote = (noteName) => {
        // console.log(this.props.instrument.loaded)
        if (!this.props.instrument.loaded) {return}
        const synth = this.props.instrument.instrumentObject
        const now = Tone.now()
        const reallyNow = Tone.context.currentTime
        synth.triggerAttack(noteName, now)
        const eventId = Tone.Transport.scheduleRepeat(() => {
            synth.triggerAttack(noteName)
            }, 2, now-this.offset)
        this.props.addNoteEvent({id: eventId, instrument: synth, type:"attack", pitch: noteName, time:reallyNow})
    }
    
    releaseNote = (noteName) => {
        if (!this.props.instrument.loaded) {return}
        console.log(this.props)
        const now = Tone.now()
        const reallyNow = Tone.context.currentTime
        const synth = this.props.instrument.instrumentObject
        // console.log(Tone.Transport)
        synth.triggerRelease(noteName, now)
        const eventId = Tone.Transport.scheduleRepeat(() => {
            synth.triggerRelease(noteName)
            },  2, now-this.offset)
        this.props.addNoteEvent({id: eventId, instrument: synth, type:"release", pitch: noteName, time:reallyNow})
    }
    
    // componentDidUpdate = () => {
    //     this.ready = false
    //     this.synth = loadInstrument(this.props.instrumentName, this)
    // }


    //NEED TO FIGURE OUT HOW TO DO THIS!!!!
    // componentWillUnmount = () => {
    //     console.log(this.eventListeners)
    //     this.eventListeners.forEach(el => window.removeEventListener(el))
    // }

    componentDidMount = () => {

        // this.synth = loadInstrument(this.props.instrumentName, this).toDestination()
        // Instrument Loading Moved to Select Instrument Component
        this.eventListeners.push(window.addEventListener("keydown", e => {
            if (e.repeat) {return}
            this.playNote(Global.notes[e.key] || "C4")
        }))
            
        this.eventListeners.push(window.addEventListener("keyup", e => {
            this.releaseNote(Global.notes[e.key] || "C4")
        }))
    }
    
    


    render() {
        console.log("Key area re-rendering")
        return(
            <div className="keyboard-area">
                This is the Keyboard Area
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    instrument: state.instruments.current
})

const mapDispatchToProps = (dispatch) => ({
    addNoteEvent: (noteEvent) => dispatch({type:'ADD_NOTE_EVENT', noteEvent}),
    loadInstrument
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardArea)
