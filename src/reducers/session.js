

export default (state = {user:null, compositionId: null, loaded:false}, action) => {
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
        default:
            return state
    }
}