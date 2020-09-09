

export default (state = [], action) => {
    switch (action.type) {
        
        case 'CREATE_LAYER':
            const newLayer = {userName: action.userName, id: action.layerId, userName: action.userName, name: action.layerName, readOnly: action.readOnly, noteEvents: [...action.layer]}
            return [...state, newLayer]
        
        case 'UPDATE_LAYER_AFTER_POST':
            return state.map(layer => layer.id === action.oldId ? {...layer, id: action.newId} : layer)

        case 'DELETE_LAYER':
            return state.filter(layer => layer.id !== action.layerId)

        default:
            return state
    }
}