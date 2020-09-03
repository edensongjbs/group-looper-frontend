export const deleteLayer = (layerId) => {
    const url = `http://localhost:3000/layers/${layerId}`
    const userId = 1 //pass in User ID.  This is just temporary hard coding
    
    const configObj = {
        method:'DELETE'
        // headers:{'Content-Type':'application/json'},
        // body:JSON.stringify({layerId})
    }
    return (dispatch) => {
        dispatch({type:'DELETE_LAYER', layerId})
        fetch(url, configObj)
        .then(res => res.json())
        .then(console.log)
    }
}