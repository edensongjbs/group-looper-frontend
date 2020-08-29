import SampleLibrary from '../sampler/Tonejs-Instruments'

// export const addLayer = (layer) => {
//     return {type: 'ADD_LAYER', layer}
// }

export const loadInstrument = (instrumentName, layerId) => {
    return (dispatch) => {
        let instrumentObject
        if (SampleLibrary.list.includes(instrumentName)) {
            instrumentObject = SampleLibrary.load({instruments:instrumentName, onload:()=> {
                    dispatch({type: 'FINISH_LOADING_INSTRUMENT', layerId })
                }
            })
        }
        dispatch({type: 'START_LOADING_INSTRUMENT', instrumentName, instrumentObject, layerId })
    }
}

// export const loadInstrument = (instrumentName, onLoadCallback) => {
//     if (SampleLibrary.list.includes(instrumentName)) {
//         const theSound = SampleLibrary.load({instruments:instrumentName, onload:()=> {
//                 theSound.toDestination()
//                 onLoadCallback()
//             }
//         })
//         return theSound
//     }
// }