
// import {connect} from 'react-redux'
import React from 'react'
import * as Tone from 'tone'
// import { render } from '@testing-library/react'

class Layer extends React.Component {

    state = {
        playing: true,
    }

    theSequence= []
    
    addToSequence = (layer, instrument) => {
        const phraseLength = (60/this.props.composition.origTempo)*this.props.composition.timeSigNum*this.props.composition.numBars
        layer.noteEvents.forEach( noteEvent => {
            if (noteEvent.type==="release") {
                const eventId = Tone.Transport.scheduleRepeat(() => {
                    if (!this.props.instrument.loaded) {return}
                    instrument.triggerRelease(noteEvent.pitch)
                    }, phraseLength, noteEvent.time, phraseLength)
                this.theSequence.push({...noteEvent, eventId})
            }
            else if (noteEvent.type==="attack") {
                const eventId = Tone.Transport.scheduleRepeat(() => {
                    if (!this.props.instrument.loaded) {return}
                    instrument.triggerAttack(noteEvent.pitch)
                    }, phraseLength, noteEvent.time, phraseLength)
                this.theSequence.push({...noteEvent, eventId})
            }
        })
        this.setState({playing: true})
    }

    componentDidMount = () => {
        this.addToSequence(this.props.layer, this.props.instrument.instrumentObject)
    }

    removeSequence = (instrument) => {
        this.theSequence.forEach(se => {
            Tone.Transport.clear(se.eventId)
            if (se.type==="attack") {
                instrument.triggerRelease(se.pitch)
            }
        })
        this.theSequence = []
        this.setState({playing:false})
    }

    muteOrUnmuteLayer = () => {
        if (this.state.playing) {
            this.removeSequence(this.props.instrument.instrumentObject)
        }
        else {
            this.addToSequence(this.props.layer, this.props.instrument.instrumentObject)
        }
    }

    playStatus = () => {
        if (!this.props.instrument.loaded) {
            return "layer-loading"
        }
        if (this.state.playing) {
            return "layer-playing"
        }
        else {
            return "layer-muted"
        }
    }

    render() {
        return(
            <li>
                <div className="layer-li"><button>X</button><span className={this.playStatus()} onClick={this.muteOrUnmuteLayer}>{this.props.layer.name}</span></div>
            </li>
        )
    }
}

export default Layer