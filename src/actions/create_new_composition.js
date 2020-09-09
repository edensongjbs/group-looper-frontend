import { loadInstrument } from './instrument'
import composition from '../reducers/composition'
import { establishTransportSettings } from '../lib/establish_transport_settings'
import { baseUrl } from '../settings/global_settings'

export const createNewComposition = (composition) => {
    const url = `${baseUrl}compositions/`
    // const userId = 1 //pass in User ID.  This is just temporary hard coding
    const compositionObj = {
        name: composition.title,
        tempo: composition.origTempo,
        // creator_id: userId,
        num_bars: composition.numBars,
        time_sig_num: composition.timeSigNum,
        time_sig_denom: composition.timeSigDenom
    }

    const configObj = {
        method:'POST',
        headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.jwt}`},
        body:JSON.stringify(compositionObj)
    }
    return (dispatch) => {
        establishTransportSettings(composition.origTempo, composition.timeSigNum, composition.timeSigDenom, composition.numBars)
        dispatch({type:'FINISH_LOADING_COMPOSITION', composition})
        fetch(url, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                console.log(json)
                debugger
                dispatch({type:'LOG_ERRORS', errors: [json.error]})
            }
            else {
                console.log(json)
                dispatch({type:'ADD_ID_TO_COMPOSITION', id:json.id})
                dispatch({type:'FINISH_LOADING'})
                dispatch({type:'TRIGGER_METRONOME_CONSTRUCTION'})
                dispatch({type:'LOGIN', user:{userName:json.user.userName, jwt: localStorage.jwt}})
                dispatch({type:'ADD_USER', user:{...json.user, loggedIn:true}})
                window.history.pushState({pathname:`/${json.id}`}, "", `/${json.id}`)
            }
        })
    }
}