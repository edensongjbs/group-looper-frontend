import React from 'react'
import { Tone } from 'tone/build/esm/core/Tone'

export default class TransportControls extends React.Component {
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

