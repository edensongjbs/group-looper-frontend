import {connect} from 'react-redux'
import React from 'react'
import Layer from '../components/Layer'
import * as Tone from 'tone'

const Layers = (props) => {
    console.log(props)
    return(
        <ul>
            {props.layers.map( layer => {
                return <Layer key={layer.id} layer={layer} instrument={new Tone.PolySynth(Tone.Synth).toDestination()}/>
            })}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {layers: state.layers}
}

export default connect(mapStateToProps)(Layers)