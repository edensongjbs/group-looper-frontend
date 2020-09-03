

export default (state = [], action) => {
    switch (action.type) {
        
        case 'CREATE_LAYER':
            const newLayer = {id: action.layerId, name: action.layerName, readOnly: action.readOnly, noteEvents: [...action.layer]}
            return [...state, newLayer]
        
        case 'UPDATE_LAYER_AFTER_POST':
            return state.map(layer => layer.id === action.oldId ? {...layer, id: action.newId} : layer)

        case 'DELETE_LAYER':
            console.log(state, action)
            console.log(state.filter(layer => layer.id !== action.layerId))
            return state.filter(layer => layer.id !== action.layerId)
        default:
            return state
    }
}