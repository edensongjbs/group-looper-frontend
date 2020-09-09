import React from 'react'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import {v4 as uuid} from 'uuid'
import { loadComposition } from '../actions/load_composition'
import { loadInstrument } from '../actions/instrument'
import { createLayer } from '../actions/create_layer'
import {establishTransportSettings} from '../lib/establish_transport_settings'

class CompositionLoader extends React.Component {

    createMetronomeInstrument = () => {
        this.props.loadInstrument("woodblock", "metronome")
    }

    createMetronomePart = () => {
        const metronomePart = []
        const subDivision = (60.0/this.props.composition.origTempo)
        let inc = 0.00
        for (let i=1; i <= this.props.composition.numBars; i++) {
            metronomePart.push({type:"attack", pitch: "C5", time: inc})
            metronomePart.push({type:"release", pitch: "C5", time: inc+0.25})
            inc+=subDivision
            for (let o=2; o <= this.props.composition.timeSigNum; o++) {
                metronomePart.push({type:"attack", pitch: "A4", time: inc})
                metronomePart.push({type:"release", pitch: "C5", time: inc+0.25})
                inc+=subDivision
            }
        }
        this.props.loadInstrument("woodblock", "metronome")
        this.props.createLayer(metronomePart, "metronome", "metronome", this.props.composition.id, "woodblock", true, this.props.session.user.userName)
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.session.loaded !== prevProps.session.loaded){
            console.log("Here's the situation inside component Did Update", this.props, prevProps)
            if (!this.props.compositionId){
                console.log('Situation 1')
                establishTransportSettings(this.props.composition.origTempo, this.props.composition.timeSigNum, this.props.composition.timeSigDenom, this.props.composition.numBars)
                // if (this.props.session.createMetronome && !prevProps.session.createMetronome) {
                    this.createMetronomePart()
                    this.props.endMetronomeCreation()
                // }
                return
            }
            else if (this.props.compositionId === "new"){
                this.createMetronomePart()
                return
            }
        }
        if ((this.props.session.createMetronome !== prevProps.session.createMetronome) && this.props.session.createMetronome) {
            this.createMetronomePart()
            this.props.endMetronomeCreation()
        }
        
    }

    componentDidMount = () => {
        console.log("Here is the situation inside componentDidMount", this.props)
        if (this.props.compositionId === "new"){
            if (!this.props.session.loaded){return}
            
        }
        else if (!this.props.compositionId){
            // if (!this.props.session.loaded){
            //     this.props.finishLoading()
            //     return
            // }
            // establishTransportSettings(this.props.composition.origTempo, this.props.composition.timeSigNum, this.props.composition.timeSigDenom, this.props.composition.numBars)
            
            // this.createMetronomePart()
            console.log("What do I do?")
        } 
        else {
            this.props.loadComposition(this.props.compositionId, establishTransportSettings)
        }
    }

    render(){
        return(<></>)
    }
}

const mapStateToProps = (state) => ({
    session: state.session,
    composition: state.composition
})

const mapDispatchToProps = (dispatch) => ({
    loadInstrument: (instrumentName, layerId) => dispatch(loadInstrument(instrumentName, layerId)),
    endMetronomeCreation: () => dispatch({type:'END_METRONOME_CREATION'}),
    finishLoading: () => dispatch({type:'FINISH_LOADING'}),
    createLayer: (layer, layerId, layerName, compositionId, instrumentName, readOnly=false) => dispatch(createLayer(layer, layerId, layerName, compositionId, instrumentName, readOnly)),
    loadComposition: (compositionId, transportCallback) => dispatch(loadComposition(compositionId, transportCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompositionLoader)