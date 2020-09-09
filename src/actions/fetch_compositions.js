import { baseUrl } from '../settings/global_settings'

export const fetchCompositions = (user) => {
    const url = `${baseUrl}getcomplist`

    const configObj = {
        headers:{'Authorization': `Bearer ${localStorage.jwt}`},
    }
    return (dispatch) => {
        fetch(url, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                dispatch({type:'LOG_ERRORS', errors: [json.error]})
            }
            else {
                
                dispatch({type:'POPULATE_COMP_LIST', compositions:json.compositions})
            }
        })
    }
}