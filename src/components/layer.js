
// import {connect} from 'react-redux'
import React from 'react'
import * as Tone from 'tone'
// import { render } from '@testing-library/react'

class Layer extends React.Component {

    state = {
        playing: true,
        loaded: false
    }

    theSequence= []

    // componentDidMount() => {
    //     this.addToSequence(this.props.layer)
    // }
    
    addToSequence = (layer, instrument) => {
        console.log(layer, instrument)
        layer.noteEvents.forEach( noteEvent => {
            if (noteEvent.type==="release") {
                const eventId = Tone.Transport.scheduleRepeat(() => {
                    if (!this.state.loaded) {return}
                    instrument.triggerRelease(noteEvent.pitch)
                    }, 2, noteEvent.time)
                this.theSequence.push({...noteEvent, eventId})
            }
            else if (noteEvent.type==="attack") {
                const eventId = Tone.Transport.scheduleRepeat(() => {
                    if (!this.state.loaded) {return}
                    instrument.triggerAttack(noteEvent.pitch)
                    }, 2, noteEvent.time)
                this.theSequence.push({...noteEvent, eventId})
            }
        })
    }

    removeSequence = (instrument) => {
        this.theSequence.forEach(se => {
            Tone.Transport.clear(se.eventId)
            if (se.type==="attack") {
                instrument.triggerRelease(se.pitch)
            }
        })
        this.theSequence = []
    }

    muteOrUnmuteLayer = () => {
        if (this.state.playing) {
            this.removeSequence(this.props.instrument)
        }
        else {
            this.addToSequence(this.props.layer, this.props.instrument)
        }
    }

    playStatus = () => {
        if (!this.state.loaded) {
            return "layer-loading"
        }
        else if (this.playing) {
            return "layer-playing"
        }
        else {
            return "layer-muted"
        }
    }

    render() {
        console.log(`rendering ${this.props.layer.id}`)
        return(
            <li>
                <div className="layer-li"><button>X</button><span className={this.playStatus()} onClick={this.muteOrUnmuteLayer}>{this.props.layer.id}</span></div>
            </li>
        )
    }
}

export default Layer