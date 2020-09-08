export const addUser = (userName, compositionId) => {
    const url = `http://localhost:3000/user_compositions`
    const userCompositionObj = {
        user_composition: {
            composition_id: compositionId,
            user_name: userName
        }
    }
    const configObj = {
        method:'POST',
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