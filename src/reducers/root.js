import layers from './layer'
import instruments from './instrument'
import transport from './transport'
import currentLayer from './current_layer'
import composition from './composition.js'
import layerName from './layer_name.js'
import { combineReducers } from 'redux'


export default combineReducers({
    layers, instruments, transport, currentLayer, composition, layerName
})