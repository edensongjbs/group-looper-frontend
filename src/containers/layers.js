import {connect} from 'react-redux'
import React from 'react'
import Layer from '../components/layer'
import * as Tone from 'tone'

const Layers = (props) => {
    console.log(props)
    return(
        <ul>
            {props.layers.map( layer => {
                return <Layer layer={layer} instrument={new Tone.PolySynth(Tone.Synth).toDestination()}/>
            })}
        </ul>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {layers: state.layers}
}

export default connect(mapStateToProps)(Layers)