

export default (state = {user:null, form:'LOG_IN', compositionId: null, loaded:false, createMetronome:false, cableApp:null}, action) => {
    switch (action.type) {

        case 'START_LOADING':
            return {...state, loaded:false}
        
        case 'FINISH_LOADING':
            return {...state, loaded:true}
        
        case 'UPDATE_COMPOSITION':
            return {...state, compositionId:action.compositionId}
        
        case 'LOGIN':
            return {...state, user:action.user}
        
        case 'LOGOUT':
            return {...state, user:null}
        
        case 'TRIGGER_METRONOME_CREATION':
            return {...state, createMetronome:true}
        
            case 'END_METRONOME_CREATION':
            return {...state, createMetronome:false}
        
        case 'ESTABLISH_CABLE_APP':
            return {...state, cableApp:action.cableApp}
        
        default:
            return state
    }
}