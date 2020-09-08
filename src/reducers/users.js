export default (state = [], action) => {
    switch (action.type) {
        
        case 'ADD_USER':
            console.log(action)
            const newUser = {userName: action.userName, loggedIn:action.loggedIn}
            return [...state, newUser]
        
        case 'REMOVE_USER':
            return state.filter(user => user.userName !== action.userName)

        case 'UPDATE_USER_STATUS':
            return state.map(user => user.userName === action.userName ? {...user, loggedIn: action.loggedIn} : user)

        default:
            return state

    }
}