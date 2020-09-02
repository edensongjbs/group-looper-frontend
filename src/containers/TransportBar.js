import React from 'react'
import TransportControls from '../components/TransportControls'
import TempoMeterInfo from '../components/TempoMeterInfo'
import CurrentLayerControls from '../components/CurrentLayerControls'
import LayerName from '../components/LayerName'
import SongTitle from '../components/SongTitle'
import CompositionLoader from '../components/CompositionLoader'
import { connect } from 'react-redux'
import CompositionWebSocket from '../components/CompositionWebSocket'

class TransportBar extends React.Component {
    render() {
        return(
            <div className={this.props.loaded ? "transport loaded" : "transport unloaded"}>
                <CompositionLoader compositionId={this.props.id}/>
                <CompositionWebSocket/>
                {this.props.loaded ?
                    <>
                        <SongTitle/>
                        <LayerName/>
                        <TransportControls/>
                        <TempoMeterInfo/>
                        <CurrentLayerControls/>
                    </>
                :
                    <h1>New Composition Form</h1>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loaded: state.session.loaded,
    // compositionId: state.session.compositionId
})

export default connect(mapStateToProps)(TransportBar)