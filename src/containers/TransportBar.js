import React from 'react'
import TransportControls from '../components/TransportControls'
import TempoMeterInfo from '../components/TempoMeterInfo'
import CurrentLayerControls from '../components/CurrentLayerControls'
import LayerName from '../components/LayerName'
import SongTitle from '../components/SongTitle'
import CompositionLoader from '../components/CompositionLoader'
import { connect } from 'react-redux'

class TransportBar extends React.Component {
    render() {
        return(
            // this.props.loaded ?
                <div className="transport loaded">
                    <SongTitle/>
                    <LayerName/>
                    <TransportControls/>
                    <TempoMeterInfo/>
                    <CurrentLayerControls/>
                </div> 
                // :
                // <div className="transport unloaded">
                    // {/* <FormTitle/> */}
                    // <h1>Title of the Form</h1>
                    // {this.props.compositionId ? <CompositionLoader compositionId={this.props.compositionId}/> : "Not Here!!!"}
                // </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loaded: state.session.loaded,
    compositionId: state.session.compositionId
})

export default connect(mapStateToProps)(TransportBar)