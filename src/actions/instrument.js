import SampleLibrary from '../sampler/Tonejs-Instruments'

export const loadInstrument = (instrumentName, layerId) => {
    return (dispatch) => {
        let instrumentObject
        if (SampleLibrary.list.includes(instrumentName)) {
            instrumentObject = SampleLibrary.load({instruments:instrumentName, onload:()=> {
                    dispatch({type: 'FINISH_LOADING_INSTRUMENT', layerId })
                }
            })
        }
        console.log(instrumentName, instrumentObject, layerId)
        dispatch({type: 'START_LOADING_INSTRUMENT', instrumentName, instrumentObject, layerId })
    }
}

