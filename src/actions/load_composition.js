import { loadInstrument } from './instrument'

export const loadComposition = (compositionId) => {
    const url = `http://localhost:3000/compositions/${compositionId}`
    return (dispatch) => {
        dispatch({type:'START_LOADING_COMPOSITION'})
        fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            json.layers.forEach(layer => {
                dispatch(loadInstrument(layer.instrumentName, layer.id))
                dispatch({type:'CREATE_LAYER', layer: JSON.parse(layer.layerString), layerId: layer.id, layerName: layer.layerName, readOnly: layer.readOnly})
            })
            dispatch({type:'FINISH_LOADING_COMPOSITION', composition:json})})
    }
}