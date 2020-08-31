import React from 'react'
import { connect } from 'react-redux'

class TempoMeterInfo extends React.Component {
    render() {
        return (
            <div className="tempo-meter">
                {`${this.props.tempo}bpm and ${this.props.meter}`}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tempo: state.composition.origTempo,
    meter: `${state.composition.timeSigNum}/${state.composition.timeSigDenom}`
})

export default connect(mapStateToProps)(TempoMeterInfo)