import { bindActionCreators } from "redux";

export default (state="Enter Layer Name", action) => {
    switch (action.type) {
        case 'CHANGE_LAYER_NAME':
            return action.name.length > 0 ? action.name : state
        case 'RESET_LAYER_NAME':
            return 'Enter Layer Name'
        default :
            return state
    }
}