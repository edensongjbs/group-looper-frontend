import { loadInstrument } from './instrument'

export const loadComposition = (compositionId, transportCallback) => {
    const url = `http://localhost:3000/compositions/${compositionId}`
    return (dispatch) => {
        dispatch({type:'START_LOADING_COMPOSITION'})
        fetch(url)
        .then(res => res.json())
        .then(json => {
            transportCallback(json.origTempo, json.timeSigNum, json.timeSigDenom, json.numBars)
            json.layers.forEach(layer => {
                dispatch(loadInstrument(layer.instrumentName, layer.id))
                dispatch({type:'CREATE_LAYER', layer: JSON.parse(layer.layerString), layerId: layer.id, layerName: layer.layerName, readOnly: layer.readOnly})
            })
            dispatch({type:'FINISH_LOADING_COMPOSITION', composition:json})})
            // dispatch({type:'FINISH_LOADING'})
    }
}