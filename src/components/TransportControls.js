import React from 'react'
import { Tone } from 'tone/build/esm/core/Tone'
import { connect } from 'react-redux'

class TransportControls extends React.Component {
    
    render() {
        return (
        <div className="playback-controls">
            <button onClick={Tone.start}>Play</button>
            <button>Commit</button>
            <button>Clear</button>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    playing: state.transport.playing
})

const mapDispatchToProps = (dispatch) => ({
    startMusic: () => dispatch({type:'START_MUSIC'}),
    stopMusic: () => dispatch({type:'STOP_MUSIC'})
})

export default connect(mapStateToProps, mapDispatchToProps)(TransportControls)