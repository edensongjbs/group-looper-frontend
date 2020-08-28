import {v4 as uuid} from 'uuid'

export default (state = [], action) => {
    switch (action.type) {
        case 'CREATE_LAYER':
            const id = uuid()
            const newLayer = {id, noteEvents: [...action.layer]}
            console.log(newLayer)
            // soundEvents.forEach(se => {
            //     Tone.Transport.clear(se.id)
            //     })
            // action.callBack()
            return [...state, newLayer]
        default:
            return state
    }
}