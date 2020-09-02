import React from 'react'
import { connect } from 'react-redux'
// import createLayer from '../actions/create_layer'
import {loadInstrument} from '../actions/instrument'

class CompositionWebSocket extends React.Component {

    createSubscription = () => {
        if (!this.props.cableApp) {return}
        this.props.cableApp.composition =
        this.props.cableApp.cable.subscriptions.create({
            channel: 'CompositionsChannel',
            composition: this.props.compositionId
        },
        {
            received: (newLayer) => {
                // does it need formatting?
                console.log(newLayer)
                this.props.loadInstrument(newLayer.instrumentName, newLayer.layerId)
                this.props.createLayer(newLayer)
            }
        })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.compositionId !== prevProps.compositionId) {
            if (this.props.cableApp.composition) {
                this.props.cableApp.cable.subscriptions.remove(this.props.cableApp.composition)
            }
            this.createSubscription()
        }
    }

    componentDidMount = () => {
        this.createSubscription()
    }
    
    render() {
        return(<></>)
    }

}

const mapStateToProps = (state) => ({
    cableApp: state.session.cableApp,
    compositionId: state.composition.id
})

const mapDispatchToProps = (dispatch) => ({
    createLayer: (newLayer) => dispatch({type:'CREATE_LAYER',layer: newLayer.layer, layerId:newLayer.layerId, layerName:newLayer.layerName, compositionId:newLayer.compositionId, instrumentName:newLayer.instrumentName, readOnly:false}),
    loadInstrument: (instrumentName, layerId) => dispatch(loadInstrument(instrumentName, layerId))
})


export default connect(mapStateToProps, mapDispatchToProps)(CompositionWebSocket)