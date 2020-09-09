export default (state = [], action) => {
    switch (action.type) {
        
        case 'POPULATE_COMP_LIST':
            return action.compositions
        
        case 'RESET_COMP_LIST':
            return []
    
        default:
            return state

    }
}