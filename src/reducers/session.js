

export default (state = {user:null, compositionId: null, loaded:false, createMetronome:false}, action) => {
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
            console.log('commencing metronome creation')
            return {...state, createMetronome:true}
        case 'END_METRONOME_CREATION':
            console.log('ending metronome creation')
            return {...state, createMetronome:false}
        default:
            return state
    }
}