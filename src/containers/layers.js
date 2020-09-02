import {connect} from 'react-redux'
import React, { Component } from 'react'
import Layer from '../components/Layer'

class Layers extends React.Component {
    // componentDidUpdate = (prevProps) => {
    //     console.log('previous layer props...', prevProps)
    //     console.log('current layer props...', this.props)
    // }
    render() {
        return(
            <ul>
                {this.props.layers.map( layer => {
                    return <Layer key={layer.id} layer={layer} transportPlaying={this.props.playing} composition={this.props.composition} instrument={this.props.instruments[layer.id]}/>
                })}
            </ul>
        )
    }
}



const mapStateToProps = (state) => ({
    playing: state.transport.playing,
    composition: state.composition,
    layers: state.layers,
    instruments: state.instruments
})

export default connect(mapStateToProps)(Layers)