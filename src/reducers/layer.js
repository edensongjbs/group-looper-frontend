

export default (state = [], action) => {
    switch (action.type) {
        case 'CREATE_LAYER':
            const newLayer = {id: action.layerId, name: action.layerName, readOnly: action.readOnly, noteEvents: [...action.layer]}
            // soundEvents.forEach(se => {
            //     Tone.Transport.clear(se.id)
            //     })
            // action.callBack()
            return [...state, newLayer]
        case 'UPDATE_LAYER_AFTER_POST':
            return state.map(layer => layer.id === action.oldId ? {...layer, id: action.newId} : layer)
        default:
            return state
    }
}