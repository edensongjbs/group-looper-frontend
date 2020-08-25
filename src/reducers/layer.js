

export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_LAYER':
            return [...state, action.layer]
        default:
            return state
    }
}