
export default (state = {title: "Composition Name", creatorName:null, origTempo:120.0, numBars: 2, timeSigNum: 4, timeSigDenom: 4, }, action) => {
    switch (action.type) {

        case 'START_LOADING_COMPOSITION':
            return {...state, loading: true}
        
        case 'FINISH_LOADING_COMPOSITION':
            return {...action.composition, loading: false}
        
        case 'ADD_ID_TO_COMPOSITION':
            return {...state, id:action.id}
        
        default:
            return state

    }

} 