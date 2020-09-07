import React from 'react'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import {v4 as uuid} from 'uuid'
import { loadComposition } from '../actions/load_composition'
import { createLayer } from '../actions/create_layer'

class TransportControls extends React.Component {
    
    commitHandler = () => {
        const id = uuid()
        this.props.currentInstrumentToNewLayer(id)
        this.props.createLayer(this.props.currentLayer, id, this.props.layerName, this.props.composition.id, this.props.currentInstrument, this.props.userName, false)
        this.props.resetLayerName()
    }

    render() {
        return (
        <div className="playback-controls">
            <button onClick={this.props.playing ? this.props.stopMusic : this.props.startMusic}>{this.props.playing ? "Stop" : "Play"}</button>
            <button onClick={this.commitHandler}>Commit</button>
            <button onClick={this.props.clearNoteEvents}>Clear</button>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentInstrument: state.instruments.current.name,
    composition: state.composition,
    currentLayer: state.currentLayer,
    playing: state.transport.playing,
    layerName: state.layerName,
    userName: state.session.user.userName
})

const mapDispatchToProps = (dispatch) => ({
    resetLayerName: () => dispatch({type:'RESET_LAYER_NAME'}),
    currentInstrumentToNewLayer: (layerId) => dispatch({type:'CURRENT_INSTRUMENT_TO_NEW_LAYER', layerId}),
    startMusic: () => dispatch({type:'START_MUSIC'}),
    stopMusic: () => dispatch({type:'STOP_MUSIC'}),
    clearNoteEvents: () => dispatch({type:'CLEAR_NOTE_EVENTS'}),
    createLayer: (layer, layerId, layerName, compositionId, instrumentName, userName, readOnly) => dispatch(createLayer(layer, layerId, layerName, compositionId, instrumentName, userName, readOnly))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransportControls)