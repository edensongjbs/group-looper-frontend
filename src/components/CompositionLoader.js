import React from 'react'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import {v4 as uuid} from 'uuid'
import { loadComposition } from '../actions/load_composition'
import { createLayer } from '../actions/create_layer'

class CompositionLoader extends React.Component {

    createMetronomePart = () => {
        const metronomePart = []
        const subDivision = (60.0/this.props.composition.origTempo)
        console.log(subDivision)
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
        console.log(metronomePart)
    }

    // componentDidUpdate = (prevProps) => {
    //     console.log(prevProps, this.props)
    //     if (prevProps.composition!==this.props.composition){
    //         console.log(this.props.composition)
    //         this.establishTransportSettings()
    //     }
    //     // if (prevProps.composition)
    // }

    establishTransportSettings = (tempo, timeSigNum, timeSigDenom, numBars) => {
        console.log('establishing trasnport settings', tempo, timeSigNum, timeSigDenom, numBars)
        Tone.Transport.stop()
        Tone.Transport.loop = true
        Tone.Transport.bpm.value = tempo
        Tone.Transport.timeSignature = [timeSigNum, timeSigDenom]
        Tone.Transport.loopEnd = `${numBars}m`
        Tone.Transport.loopStart = 0
    }

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

    componentDidMount = () => {
        
        console.log(this.props)
        if (this.props.compositionId === "new"){
            this.establishTransportSettings(this.props.composition.origTempo, this.props.composition.timeSigNum, this.props.composition.timeSigDenom, this.props.composition.numBars)
            this.createMetronomePart()
            // create new metnroome part and new session
        }
        else if (!this.props.compositionId){
            console.log('NO COMPOOSITION ID')
            this.establishTransportSettings(this.props.composition.origTempo, this.props.composition.timeSigNum, this.props.composition.timeSigDenom, this.props.composition.numBars)
            this.createMetronomePart()
        } 
        else {
            console.log(this.props.composition)
            this.props.loadComposition(this.props.compositionId, this.establishTransportSettings)
        }
    }

    render(){
        return(<></>)
    }
}

const mapStateToProps = (state) => ({
    // currentInstrument: state.instruments.current.name,
    // session: state.session
    composition: state.composition,
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
    createLayer: (layer, layerId, layerName, compositionId, instrumentName, readOnly=false) => dispatch(createLayer(layer, layerId, layerName, compositionId, instrumentName, readOnly)),
    loadComposition: (compositionId, transportCallback) => dispatch(loadComposition(compositionId, transportCallback))
    // exportNoteEvents: (currentLayer) => dispatch({type:'EXPORT_NOTE_EVENTS', currentLayer}),
})

export default connect(mapStateToProps, mapDispatchToProps)(CompositionLoader)