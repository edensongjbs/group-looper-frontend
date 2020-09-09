import { baseUrl } from '../settings/global_settings'

export const removeUser = (userName, compositionId) => {
    const url = `${baseUrl}user_compositions`
    const userCompositionObj = {
        user_composition: {
            composition_id: compositionId,
            user_name: userName
        }
    }
    const configObj = {
        method:'DELETE',
        headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.jwt}` },
        body:JSON.stringify(userCompositionObj)
    }

    return (dispatch) => {
        fetch(url, configObj)
        .then(res => res.json())
        .then(json => {
            
        })
    }
}