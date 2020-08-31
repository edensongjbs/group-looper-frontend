
export const loadComposition = (compositionId) => {
    const url = `http://localhost:3000/compositions/${compositionId}`
    return (dispatch) => {
        dispatch({type:'START_LOADING_COMPOSITION'})
        fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            dispatch({type:'FINISH_LOADING_COMPOSITION', composition:json})})
    }
}