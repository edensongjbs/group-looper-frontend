export const signupUser = (user) => {
    const url = `http://localhost:3000/users`
    const userObj = {
        name: user.name,
        password: user.password,
        password_confirmation: user.confirmPassword,
        user_name: user.userName,
        email: user.email
    }

    const configObj = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userObj)
    }
    return (dispatch) => {
        fetch(url, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.errors) {
                dispatch({type:'LOG_ERRORS', errors:json.errors})
            }
            else {
                dispatch({type:'LOGIN', user: {userName: json.userName, jwt: json.jwt}})
            }
        })
    }
}