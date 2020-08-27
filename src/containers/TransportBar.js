import React from 'react'

export default class TransportBar extends React.Component {
    render() {
        return(
            <div className="transport">
                <div className="song-title"><h3>Song Title</h3></div>
                <div className="layer-name"><h4>Layer Name</h4></div>
                <div className="playback-controls">
                    <button>Play</button>
                    <button>Commit</button>
                    <button>Clear</button>
                </div>
                <div className="tempo-meter">Tempo and Meter</div>
                <div className="sound-select"><p>Sound Select</p>
                    <form>
                        <select type="select">
                            <option>Default Option</option>
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}