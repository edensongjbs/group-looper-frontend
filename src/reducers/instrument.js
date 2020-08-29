export default (state = {current:{loaded:false}}, action) => {
    switch (action.type) {
        case 'START_LOADING_INSTRUMENT':
            console.log('start loading')
            return {...state, [action.layerId]:{name: action.instrumentName, instrumentObject: action.instrumentObject, loaded: false}}
        case 'FINISH_LOADING_INSTRUMENT':
            const theInstrument = state[action.layerId]
            theInstrument.loaded = true
            console.log('finish loading')
            theInstrument.instrumentObject.toDestination()
            return {...state, [action.layerId]:theInstrument}
        case 'REMOVE_INSTRUMENT': //should be invoked when a layer is deleted
            delete state[action.layerId]
            return state
        default:
            return state
    }
}