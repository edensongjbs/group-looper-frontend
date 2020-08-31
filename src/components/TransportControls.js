import React from 'react'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import {v4 as uuid} from 'uuid'

class TransportControls extends React.Component {
    
    commitHandler = () => {
        const id = uuid()
        this.props.currentInstrumentToNewLayer(id)
        this.props.createLayer(this.props.currentLayer, id)
        this.props.clearNoteEvents()
    }


    // Will need to abstract this out
    createMetronomePart = () => {
        const metronomePart = []
        metronomePart.push({type:"attack", pitch: "C5", time:Tone.now()})
        metronomePart.push({type:"attack", pitch: "A4", time:Tone.now()+0.5})
        metronomePart.push({type:"attack", pitch: "A4", time:Tone.now()+1.0})
        metronomePart.push({type:"attack", pitch: "A4", time:Tone.now()+1.5})
        metronomePart.push({type:"release", pitch: "C5", time:Tone.now()+0.25})
        metronomePart.push({type:"release", pitch: "A4", time:Tone.now()+0.75})
        metronomePart.push({type:"release", pitch: "A4", time:Tone.now()+1.25})
        metronomePart.push({type:"release", pitch: "A4", time:Tone.now()+1.75})
        this.props.createLayer(metronomePart, "metronome")
    }

    componentDidMount = () => {
        // Tone.Transport.stop()
        this.createMetronomePart()
        Tone.Transport.loop = true
        Tone.Transport.loopEnd = 2
        Tone.Transport.loopStart = 0
        window.setInterval(() => {
            console.log(Tone.Transport.now())
        }, 1000)
    }

    render() {
        return (
        <div className="playback-controls">
            <button onClick={this.props.playing ? this.props.stopMusic : this.props.startMusic}>{this.props.playing ? "Stop" : "Play"}</button>
            <button onClick={this.commitHandler}>Commit</button>
            <button>Clear</button>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentLayer: state.currentLayer,
    playing: state.transport.playing
})

const mapDispatchToProps = (dispatch) => ({
    currentInstrumentToNewLayer: (layerId) => dispatch({type:'CURRENT_INSTRUMENT_TO_NEW_LAYER', layerId}),
    startMusic: () => dispatch({type:'START_MUSIC'}),
    stopMusic: () => dispatch({type:'STOP_MUSIC'}),
    clearNoteEvents: () => dispatch({type:'CLEAR_NOTE_EVENTS'}),
    createLayer: (layer, layerId) => dispatch({type:'CREATE_LAYER', layer, layerId, callBack: () => dispatch({type: 'CLEAR_NOTE_EVENTS'})}),
    // exportNoteEvents: (currentLayer) => dispatch({type:'EXPORT_NOTE_EVENTS', currentLayer}),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransportControls)