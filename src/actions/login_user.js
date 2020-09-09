import { baseUrl } from '../settings/global_settings'

export const loginUser = (user) => {
    const url = `${baseUrl}login`
    const userObj = {...user}

    const configObj = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userObj)
    }
    return (dispatch) => {
        fetch(url, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                dispatch({type:'LOG_ERRORS', errors: [json.error]})
            }
            else {
                
                dispatch({type:'LOGIN', user: {userName: json.userName, jwt: json.jwt}})
            }
        })
    }
}