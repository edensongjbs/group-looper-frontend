export const loginUser = (user) => {
    const url = `http://localhost:3000/login`
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
            dispatch({type:'LOGIN', user: {userName: json.userName, jwt: json.jwt}})
        })
    }
}