import React from 'react'
import SampleLibrary from '../sampler/Tonejs-Instruments'
import { connect } from 'react-redux'
import { loadInstrument } from '../actions/instrument'

class CurrentLayerControls extends React.Component {

    allOptions = () => SampleLibrary.list.map((instrumentName, index) => <option key={index} value={instrumentName}>{instrumentName}</option>)

    selectNewInstrument = (e) => {
        console.log(e.target)
        e.target.blur()
        this.props.loadInstrument(e.target.value, "current")
    }

    createMetronomeLayer = () => {
        this.props.loadInstrument("metronome", "current")
    }

    //Some craziness - is there a more React way to hanlde this?
    componentDidMount = () => {
        this.selectNewInstrument({target:{blur:()=>{}, value:(document.querySelector(".sound-selector-select").value)}})
        this.createMetronomeLayer()
    }

    render() {
        return (
            <div className="sound-select"><p>Sound Select</p>
                <form>
                    <select className="sound-selector-select" onChange={this.selectNewInstrument} type="select">
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