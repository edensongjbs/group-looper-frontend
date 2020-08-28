import React from 'react'
import { Tone } from 'tone/build/esm/core/Tone'
import { connect } from 'react-redux'

class TransportControls extends React.Component {
    
    commitHandler = () => {
        this.props.createLayer(this.props.currentLayer)
        this.props.clearNoteEvents()
    }

    render() {
        console.log(this.props.currentLayer)
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
    startMusic: () => dispatch({type:'START_MUSIC'}),
    stopMusic: () => dispatch({type:'STOP_MUSIC'}),
    clearNoteEvents: () => dispatch({type:'CLEAR_NOTE_EVENTS'}),
    createLayer: (layer) => dispatch({type:'CREATE_LAYER', layer, callBack: () => dispatch({type: 'CLEAR_NOTE_EVENTS'})}),
    // exportNoteEvents: (currentLayer) => dispatch({type:'EXPORT_NOTE_EVENTS', currentLayer}),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransportControls)