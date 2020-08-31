import { bindActionCreators } from "redux";

export default (state="Enter Layer Name", action) => {
    switch (action.type) {
        case 'CHANGE_LAYER_NAME':
            return action.name.length > 0 ? action.name : state
        default :
            return state
    }
}