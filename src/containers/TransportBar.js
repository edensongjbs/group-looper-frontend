import React from 'react'
import TransportControls from '../components/TransportControls'
import TempoMeterInfo from '../components/TempoMeterInfo'
import CurrentLayerControls from '../components/CurrentLayerControls'

export default class TransportBar extends React.Component {
    render() {
        return(
            <div className="transport">
                <div className="song-title"><h3>Song Title</h3></div>
                <div className="layer-name"><h4>Layer Name</h4></div>
                <TransportControls/>
                <TempoMeterInfo/>
                <CurrentLayerControls/>
            </div>
        )
    }
}