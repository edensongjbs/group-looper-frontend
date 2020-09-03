import * as Tone from 'tone'

export const clearNotes = (noteArray) => {
    noteArray.forEach(note => {
        Tone.Transport.clear(note.id)
    })
}