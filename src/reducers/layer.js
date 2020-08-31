

export default (state = [], action) => {
    switch (action.type) {
        case 'CREATE_LAYER':
            const newLayer = {id: action.layerId, noteEvents: [...action.layer]}
            // soundEvents.forEach(se => {
            //     Tone.Transport.clear(se.id)
            //     })
            // action.callBack()
            return [...state, newLayer]
        default:
            return state
    }
}