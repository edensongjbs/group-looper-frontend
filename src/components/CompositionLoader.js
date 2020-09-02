import React from 'react'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import {v4 as uuid} from 'uuid'
import { loadComposition } from '../actions/load_composition'
import { createLayer } from '../actions/create_layer'
import {establishTransportSettings} from '../lib/establish_transport_settings'

class CompositionLoader extends React.Component {

    createMetronomePart = () => {
        const metronomePart = []
        const subDivision = (60.0/this.props.composition.origTempo)
        let inc = Tone.now()
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
        this.props.createLayer(metronomePart, "metronome", "metronome", this.props.composition.id, "woodblock", true)
    }

    // componentDidUpdate = (prevProps) => {
    //     console.log(prevProps, this.props)
    //     if (prevProps.composition!==this.props.composition){
    //         console.log(this.props.composition)
    //         this.establishTransportSettings()
    //     }
    //     // if (prevProps.composition)
    // }

    

    // componentDidUpdate = (prevProps) => {
    //     if (this.props.session.id===prevProps.session.id){return}
    //     console.log(this.props.composition)
    //     this.establishTransportSettings()
    //     if (this.props.session.compositionId === "new"){
    //         this.createMetronomePart()
    //         // create new metnroome part and new session
    //     } 
    //     else {
    //         this.props.loadComposition(this.props.session.compositionId)
    //     }
    // }

    componentDidUpdate = (prevProps) => {
        if (this.props.session.loaded !== prevProps.session.loaded){
            if (!this.props.compositionId){
                establishTransportSettings(this.props.composition.origTempo, this.props.composition.timeSigNum, this.props.composition.timeSigDenom, this.props.composition.numBars)
                this.createMetronomePart()
            }
            else if (this.props.compositionId === "new"){
                this.createMetronomePart()
            }
        }
        
    }

    componentDidMount = () => {
        
        if (this.props.compositionId === "new"){
            if (!this.props.session.loaded){return}
            // establishTransportSettings(this.props.composition.origTempo, this.props.composition.timeSigNum, this.props.composition.timeSigDenom, this.props.composition.numBars)
            this.createMetronomePart()
            // create new metnroome part and new session
        }
        else if (!this.props.compositionId){
            if (!this.props.session.loaded){
                this.props.finishLoading()
                return
            }
            establishTransportSettings(this.props.composition.origTempo, this.props.composition.timeSigNum, this.props.composition.timeSigDenom, this.props.composition.numBars)
            this.createMetronomePart()
        } 
        else {
            // console.log(this.props.compositionId)
            this.props.loadComposition(this.props.compositionId, establishTransportSettings)
        }
    }

    render(){
        return(<></>)
    }
}

const mapStateToProps = (state) => ({
    // currentInstrument: state.instruments.current.name,
    session: state.session,
    composition: state.composition
    // currentLayer: state.currentLayer,
    // playing: state.transport.playing,
    // layerName: state.layerName
})

const mapDispatchToProps = (dispatch) => ({
    // resetLayerName: () => dispatch({type:'RESET_LAYER_NAME'}),
    // currentInstrumentToNewLayer: (layerId) => dispatch({type:'CURRENT_INSTRUMENT_TO_NEW_LAYER', layerId}),
    // startMusic: () => dispatch({type:'START_MUSIC'}),
    // stopMusic: () => dispatch({type:'STOP_MUSIC'}),
    // clearNoteEvents: () => dispatch({type:'CLEAR_NOTE_EVENTS'}),
    finishLoading: () => dispatch({type:'FINISH_LOADING'}),
    createLayer: (layer, layerId, layerName, compositionId, instrumentName, readOnly=false) => dispatch(createLayer(layer, layerId, layerName, compositionId, instrumentName, readOnly)),
    loadComposition: (compositionId, transportCallback) => dispatch(loadComposition(compositionId, transportCallback))
    // exportNoteEvents: (currentLayer) => dispatch({type:'EXPORT_NOTE_EVENTS', currentLayer}),
})

export default connect(mapStateToProps, mapDispatchToProps)(CompositionLoader)