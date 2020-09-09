import { baseUrl } from '../settings/global_settings'

export const deleteLayer = (layerId) => {
    const url = `${baseUrl}layers/${layerId}`
    // const userId = 1 //pass in User ID.  This is just temporary hard coding
    
    const configObj = {
        method:'DELETE',
        headers:{'Authorization': `Bearer ${localStorage.jwt}`},
    }
    return (dispatch) => {
        dispatch({type:'DELETE_LAYER', layerId})
        fetch(url, configObj)
        .then(res => res.json())
        .then()
    }
}