import layers from './layer'
import instruments from './instrument'
import transport from './transport'
import currentLayer from './current_layer'
import { combineReducers } from 'redux'

export default combineReducers({
    layers, instruments, transport, currentLayer
})