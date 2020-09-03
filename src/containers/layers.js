import {connect} from 'react-redux'
import React, { Component } from 'react'
import Layer from '../components/Layer'
import { deleteLayer } from '../actions/delete_layer'

class Layers extends React.Component {

    render() {
        return(
            <ul>
                {this.props.layers.map( layer => {
                    return <Layer key={layer.id} layer={layer} delete={this.props.deleteLayer} transportPlaying={this.props.playing} composition={this.props.composition} instrument={this.props.instruments[layer.id]}/>
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

const mapDispatchToProps = (dispatch) => ({
    deleteLayer: (layerId) => dispatch(deleteLayer(layerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layers)