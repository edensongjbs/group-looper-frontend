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
                {this.props.loaded  && this.props.user ?
                    <>
                        <SongTitle/>
                        <LayerName/>
                        <TransportControls/>
                        <TempoMeterInfo/>
                        <CurrentLayerControls/>
                    </>
                : this.props.user ?
                    <h1>New Composition Form</h1>
                : this.props.form === "LOG_IN" ?
                    <h1>Please Login</h1>
                : <h1>Sign Up For An Account</h1>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loaded: state.session.loaded,
    user: state.session.user,
    form: state.session.form
    // compositionId: state.session.compositionId
})

export default connect(mapStateToProps)(TransportBar)