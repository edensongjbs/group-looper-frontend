import React from 'react'
import SampleLibrary from '../sampler/Tonejs-Instruments'
import { connect } from 'react-redux'
import { loadInstrument } from '../actions/instrument'

class CurrentLayerControls extends React.Component {

    allOptions = () => SampleLibrary.list.map((instrumentName, index) => <option key={index} value={instrumentName}>{instrumentName}</option>)

    selectNewInstrument = (e) => {
        this.props.loadInstrument(e.target.value, "current")
    }

    render() {
        return (
            <div className="sound-select"><p>Sound Select</p>
                <form>
                    <select onChange={this.selectNewInstrument} type="select">
                        {this.allOptions()}
                    </select>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadInstrument: (instrumentName, layerId) => dispatch(loadInstrument(instrumentName, layerId))
})

export default connect(null, mapDispatchToProps)(CurrentLayerControls)