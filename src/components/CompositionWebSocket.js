import React from 'react'
import { connect } from 'react-redux'
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
    
                if (this.props.layers.map(layer => layer.id).includes(newLayer.oldId)) {
                    this.props.updateInstrumentKey(newLayer.oldId, newLayer.id)
                    this.props.updateLayerAfterPost(newLayer.oldId, newLayer.id)
                }

                else {
                    this.props.loadInstrument(newLayer.instrumentName, newLayer.id)
                    this.props.createLayer(newLayer)
                }
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
    compositionId: state.composition.id,
    layers: state.layers
})

const mapDispatchToProps = (dispatch) => ({
    createLayer: (newLayer) => dispatch({type:'CREATE_LAYER',layer: JSON.parse(newLayer.layerString), layerId:newLayer.id, layerName:newLayer.layerName, compositionId:newLayer.compositionId, instrumentName:newLayer.instrumentName, readOnly:false}),
    loadInstrument: (instrumentName, layerId) => dispatch(loadInstrument(instrumentName, layerId)),
    updateInstrumentKey: (oldId, newId) => dispatch({type:'UPDATE_INSTRUMENT_KEY', oldId, newId}),
    updateLayerAfterPost: (oldId, newId) => dispatch({type:'UPDATE_LAYER_AFTER_POST', oldId, newId})
})


export default connect(mapStateToProps, mapDispatchToProps)(CompositionWebSocket)