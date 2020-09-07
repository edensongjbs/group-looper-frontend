import { loadInstrument } from './instrument'
import composition from '../reducers/composition'
import { establishTransportSettings } from '../lib/establish_transport_settings'

export const createNewComposition = (composition) => {
    const url = `http://localhost:3000/compositions/`
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
            dispatch({type:'ADD_ID_TO_COMPOSITION', id:json.id})
            dispatch({type:'FINISH_LOADING'})
            dispatch({type:'TRIGGER_METRONOME_CONSTRUCTION'})
            window.history.pushState({pathname:`/${json.id}`}, "", `/${json.id}`)
        })
    }
}