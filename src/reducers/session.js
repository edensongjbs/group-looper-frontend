

export default (state = {loggedIn: !!localStorage.jwt, user:{userName:null}, errorMessages:[], userForm:'LOG_IN', compForm:'SELECT_COMPOSITION', compositionId: null, loaded:false, createMetronome:false, cableApp:null}, action) => {
    switch (action.type) {

        case 'START_LOADING':
            return {...state, loaded:false}
        
        case 'FINISH_LOADING':
            return {...state, loaded:true}
        
        // case 'UPDATE_COMPOSITION':
        //     return {...state, compositionId:action.compositionId}
        
        case 'LOGIN':
            if (action.user.jwt) { 
                localStorage.jwt = action.user.jwt 
                return {...state, loggedIn:true, user:action.user}
            }
            else {
                return {...state}
            }
        case 'LOGOUT':
            delete localStorage.jwt
            return {...state, loggedIn:false, user:null}
        
        case 'TRIGGER_METRONOME_CREATION':
            return {...state, createMetronome:true}
        
        case 'END_METRONOME_CREATION':
            return {...state, createMetronome:false}
        
        case 'ESTABLISH_CABLE_APP':
            return {...state, cableApp:action.cableApp}

        case 'SWITCH_USER_FORM':
            return {...state, userForm:action.formValue}

        case 'SWITCH_COMP_FORM':
            return {...state, compForm:action.formValue}

        case 'LOG_ERRORS':
            return {...state, errorMessages:action.errors}

        case 'CLEAR_ERRORS':
            return {...state, errorMessages:[]}
        
        default:
            return state
    }
}