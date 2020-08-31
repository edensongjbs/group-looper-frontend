import React from 'react'
import TransportControls from '../components/TransportControls'
import TempoMeterInfo from '../components/TempoMeterInfo'
import CurrentLayerControls from '../components/CurrentLayerControls'
import LayerName from '../components/LayerName'
import SongTitle from '../components/SongTitle'

export default class TransportBar extends React.Component {
    render() {
        return(
            <div className="transport">
                <SongTitle/>
                <LayerName/>
                <TransportControls/>
                <TempoMeterInfo/>
                <CurrentLayerControls/>
            </div>
        )
    }
}