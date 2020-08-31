import React from 'react'
import * as Tone from 'tone'
import * as Global from '../settings/global_settings'
import { connect } from 'react-redux'
import { loadInstrument } from '../actions/instrument'

class KeyboardArea extends React.Component {
      
    eventListeners = [] 
    synth = null  
    offset = Tone.context.lookAhead
    
    ready = false

    
    playNote = (noteName) => {
        if (!this.props.instrument.loaded) {return}
        const synth = this.props.instrument.instrumentObject
        const now = Tone.now()
        const reallyNow = Tone.context.currentTime
        synth.triggerAttack(noteName, now)
        if (!this.props.playing) {return} 
        console.log((now-this.offset)%2)
        const eventId = Tone.Transport.scheduleRepeat(() => {
            synth.triggerAttack(noteName)
            }, 2, ((now-this.offset)%2), 2)
        this.props.addNoteEvent({id: eventId, instrument: synth, type:"attack", pitch: noteName, time:reallyNow%2})
    }
    
    releaseNote = (noteName) => {
        if (!this.props.instrument.loaded) {return}
        const now = Tone.now()
        const reallyNow = Tone.context.currentTime
        const synth = this.props.instrument.instrumentObject
        synth.triggerRelease(noteName, now)
        if (!this.props.playing) {return}
        const eventId = Tone.Transport.scheduleRepeat(() => {
            synth.triggerRelease(noteName)
            },  2, ((now-this.offset)%2), 2)
        this.props.addNoteEvent({id: eventId, instrument: synth, type:"release", pitch: noteName, time:reallyNow%2})
    }


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
        return(
            <div className="keyboard-area">
                This is the Keyboard Area
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    playing: state.transport.playing,
    instrument: state.instruments.current
})

const mapDispatchToProps = (dispatch) => ({
    addNoteEvent: (noteEvent) => dispatch({type:'ADD_NOTE_EVENT', noteEvent}),
    loadInstrument
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardArea)
