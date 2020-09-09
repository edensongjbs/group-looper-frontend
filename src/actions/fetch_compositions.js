export const fetchCompositions = (user) => {
    const url = `http://localhost:3000/getcomplist`

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
                console.log(json)
                dispatch({type:'POPULATE_COMP_LIST', compositions:json.compositions})
            }
        })
    }
}