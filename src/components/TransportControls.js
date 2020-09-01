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
        this.props.createLayer(this.props.currentLayer, id, this.props.layerName, this.props.composition.id, this.props.currentInstrument)
        this.props.resetLayerName()
        // this.props.clearNoteEvents()
    }


    // Will need to abstract this out
    createMetronomePart = () => {
        const metronomePart = []
        const subDivision = (60.0/this.props.composition.origTempo)
        console.log(subDivision)
        let inc = Tone.now()
        for (let i=1; i <= this.props.composition.numBars; i++) {
            metronomePart.push({type:"attack", pitch: "C5", time: inc})
            metronomePart.push({type:"release", pitch: "C5", time: inc+0.25})
            inc+=subDivision
            for (let o=2; o <= this.props.composition.timeSigNum; o++) {
                metronomePart.push({type:"attack", pitch: "A4", time: inc})
                metronomePart.push({type:"release", pitch: "C5", time: inc+0.25})
                inc+=subDivision
            }
        }
        this.props.createLayer(metronomePart, "metronome", "metronome", this.props.composition.id, "woodblock", true)
        console.log(metronomePart)
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.composition!==this.props.composition){
            console.log(this.props.composition)
            this.establishTransportSettings()
        }
    }

    establishTransportSettings = () => {
        Tone.Transport.stop()
        Tone.Transport.loop = true
        Tone.Transport.bpm.value = this.props.composition.origTempo
        Tone.Transport.timeSignature = [this.props.composition.timeSigNum, this.props.composition.timeSigDenom]
        Tone.Transport.loopEnd = `${this.props.composition.numBars}m`
        Tone.Transport.loopStart = 0
    }

    componentDidMount = () => {
        console.log(this.props.composition)
        this.establishTransportSettings()
        this.props.loadComposition(1)
        this.createMetronomePart()
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
    layerName: state.layerName
})

const mapDispatchToProps = (dispatch) => ({
    resetLayerName: () => dispatch({type:'RESET_LAYER_NAME'}),
    currentInstrumentToNewLayer: (layerId) => dispatch({type:'CURRENT_INSTRUMENT_TO_NEW_LAYER', layerId}),
    startMusic: () => dispatch({type:'START_MUSIC'}),
    stopMusic: () => dispatch({type:'STOP_MUSIC'}),
    clearNoteEvents: () => dispatch({type:'CLEAR_NOTE_EVENTS'}),
    createLayer: (layer, layerId, layerName, compositionId, instrumentName, readOnly=false) => dispatch(createLayer(layer, layerId, layerName, compositionId, instrumentName, readOnly)),
    loadComposition: (compositionId) => dispatch(loadComposition(compositionId))
    // exportNoteEvents: (currentLayer) => dispatch({type:'EXPORT_NOTE_EVENTS', currentLayer}),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransportControls)