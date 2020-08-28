export default (state = {current: "bass-electric"}, action) => {
    switch (action.type) {
        case 'CHANGE_INSTRUMENT':
            return {...state, [action.layerId]:action.instrumentName}
        case 'REMOVE_INSTRUMENT': //should be invoked when a layer is deleted
            delete state[action.layerId]
            return state
        default:
            return state
    }
}