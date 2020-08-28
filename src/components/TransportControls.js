import React from 'react'

export default class TransportControls extends React.Component {
    render() {
        return (
        <div className="playback-controls">
            <button>Play</button>
            <button>Commit</button>
            <button>Clear</button>
        </div>
        )
    }
}

