
// import {connect} from 'react-redux'
import React from 'react'
import * as Tone from 'tone'
// import { render } from '@testing-library/react'

let theSequence= []
  

const addToSequence = (layer, instrument) => {
    console.log(layer, instrument)
    layer.noteEvents.forEach( noteEvent => {
        if (noteEvent.type==="release") {
            const eventId = Tone.Transport.scheduleRepeat(() => {
                instrument.triggerRelease(noteEvent.pitch)
                }, 2, noteEvent.time)
            theSequence.push({...noteEvent, eventId})
        }
        else if (noteEvent.type==="attack") {
            const eventId = Tone.Transport.scheduleRepeat(() => {
                instrument.triggerAttack(noteEvent.pitch)
                }, 2, noteEvent.time)
            theSequence.push({...noteEvent, eventId})
        }
    })
}

const removeSequence = (instrument) => {
    theSequence.forEach(se => {
        Tone.Transport.clear(se.eventId)
        if (se.type==="attack") {
            instrument.triggerRelease(se.pitch)
        }
    })
   theSequence = []
}

const Layer = (props) => {
    console.log(`rendering ${props.layer.id}`)
    return(
    <li>
        <p>{props.layer.id}</p>
        <button onClick={() => addToSequence(props.layer, props.instrument)}>UnMute</button>
        <button onClick={() => removeSequence(props.instrument)}>Mute</button>
        <button onClick={ () => {
            console.log(Tone.now())
        }}>Log this Transport</button>
    </li>
    )
}

export default Layer