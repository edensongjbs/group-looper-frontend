import React from 'react'
import SampleLibrary from '../sampler/Tonejs-Instruments'
import { connect } from 'react-redux'

class CurrentLayerControls extends React.Component {

    allOptions = () => SampleLibrary.list.map((instrumentName, index) => <option key={index} value={instrumentName}>{instrumentName}</option>)

    selectNewInstrument = (e) => {
        this.props.changeInstrumentName(e.target.value, "current")
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
    changeInstrumentName: (instrumentName, layerId) => dispatch({type:'CHANGE_INSTRUMENT', instrumentName, layerId}) 
})

export default connect(null, mapDispatchToProps)(CurrentLayerControls)