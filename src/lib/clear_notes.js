import * as Tone from 'tone'

export const clearNotes = (noteArray) => {
    noteArray.forEach(note => {
        Tone.Transport.clear(note.id)
    })
}

//Move out
    // createNewLayer = (addLayer) => {
    //     const id = uuid()
    //     addLayer({id, noteEvents: [...soundEvents]})
    //     soundEvents.forEach(se => {
    //         Tone.Transport.clear(se.id)
    //         })
    //     soundEvents = []
    // }
    
    // Moveout
    // stopAll = () => {
    // soundEvents.forEach(se => {
    //     if (se.type==="attack") {
    //     synth.triggerRelease(se.pitch)
    //     }
    //     })
    //     Tone.Transport.stop(Tone.now())
    // }