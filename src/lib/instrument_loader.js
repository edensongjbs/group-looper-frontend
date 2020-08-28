import SampleLibrary from '../sampler/Tonejs-Instruments'

export const loadInstrument = (instrumentName, layerInstance) => {
    if (SampleLibrary.list.includes(instrumentName)) {
        const theSound = SampleLibrary.load({instruments:instrumentName, onload:()=> {
                theSound.toDestination()
                layerInstance.ready=true
            }
        })
        return theSound
    }
}