import React from 'react'
import * as Tone from 'tone'
import * as Global from '../settings/global_settings'
import { connect } from 'react-redux'
import NewCompositionForm from '../components/NewCompositionForm'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import SelectCompositionForm from '../components/SelectCompositionForm'

class KeyboardArea extends React.Component {
      
    synth = null  
    offset = Tone.context.lookAhead
    
    ready = false

    
    playNote = (noteName) => {
        if (!noteName) {return}
        if (this.props.transport.disabled || !this.props.instrument.loaded || !this.props.loaded) {return}
        const phraseLength = (60/this.props.composition.origTempo)*this.props.composition.timeSigNum*this.props.composition.numBars
        const synth = this.props.instrument.instrumentObject
        const now = Tone.now()
        const reallyNow = Tone.Transport.immediate()-this.props.transport.timeNow
        synth.triggerAttack(noteName, now)
        if (!this.props.playing) {return} 
        const eventId = Tone.Transport.scheduleRepeat(() => {
            this.props.instrument.instrumentObject.triggerAttack(noteName)
            }, phraseLength, (reallyNow%phraseLength), phraseLength)
        this.props.addNoteEvent({id: eventId, instrument: synth, type:"attack", pitch: noteName, time:reallyNow%phraseLength})
    }
    
    releaseNote = (noteName) => {
        if (!noteName) {return}
        if (this.props.transport.disabled || !this.props.instrument.loaded || !this.props.loaded) {return}
        const phraseLength = (60/this.props.composition.origTempo)*this.props.composition.timeSigNum*this.props.composition.numBars
        const now = Tone.now()
        const reallyNow = Tone.Transport.immediate()-this.props.transport.timeNow
        const synth = this.props.instrument.instrumentObject
        synth.triggerRelease(noteName, now)
        if (!this.props.playing) {return}
        const eventId = Tone.Transport.scheduleRepeat(() => {
            this.props.instrument.instrumentObject.triggerRelease(noteName)
            },  phraseLength, (reallyNow%phraseLength), phraseLength)
        this.props.addNoteEvent({id: eventId, instrument: synth, type:"release", pitch: noteName, time:reallyNow%phraseLength})
    }


    componentWillUnmount = () => {
        window.removeEventListener("keydown", this.respondKeyDown)
        window.removeEventListener("keyup", this.respondKeyUp)
    }

    respondKeyDown = e => {
        if (e.repeat) {return}
        this.playNote(Global.notes[e.key] || null)
    }

    respondKeyUp = e => {
        this.releaseNote(Global.notes[e.key] || null)
    }


    componentDidMount = () => {
        window.addEventListener("keydown", this.respondKeyDown)
        window.addEventListener("keyup", this.respondKeyUp)
    }
    

    render() {
        return(
            <div className="keyboard-area">
                {
                    this.props.loaded && this.props.loggedIn ? 
                    <img src="https://media.giphy.com/media/RgzryV9nRCMHPVVXPV/giphy.gif" alt="loading"/> : 
                    this.props.loggedIn ?
                    this.props.compositionForm === 'SELECT_COMPOSITION' ?
                    <SelectCompositionForm/> :
                    <NewCompositionForm/> :
                    this.props.userForm === 'LOG_IN' ?
                    <LoginForm/> :
                    <SignupForm/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loaded: state.session.loaded,
    loggedIn: state.session.loggedIn,
    user: state.session.user,
    userForm: state.session.userForm,
    compositionForm: state.session.compForm,
    composition: state.composition,
    playing: state.transport.playing,
    instrument: state.instruments.current,
    transport: state.transport
})

const mapDispatchToProps = (dispatch) => ({
    addNoteEvent: (noteEvent) => dispatch({type:'ADD_NOTE_EVENT', noteEvent})
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardArea)
