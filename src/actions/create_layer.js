export const createLayer = (layer, layerId, layerName, compositionId, instrumentName, readOnly=false) => {
    const url = `http://localhost:3000/layers`
    const userId = 1 //pass in User ID.  This is just temporary hard coding
    const layerString = JSON.stringify(layer.map(p => ({type:p.type, time:p.time, pitch:p.pitch})))
    const layerObj = {
        layer: {
            composition_id: compositionId,
            sound_preset_name: instrumentName,
            user_id: userId,
            name: layerName,
            temporary_id: layerId,
            pitch_events: layerString,
            read_only: false
        }
    }
    const configObj = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(layerObj)
    }
    return (dispatch) => {
        dispatch({type:'CREATE_LAYER', layer, layerId, layerName, readOnly})
        dispatch({type:'CLEAR_NOTE_EVENTS'})
        fetch(url, configObj)
        .then(res => res.json())
        .then(json => {
            console.log('post successful')
        })
    }
}