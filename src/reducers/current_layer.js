import { clearNotes } from '../lib/clear_notes' 

export default (state = [], action) => {
    switch (action.type) {
        
        case 'ADD_NOTE_EVENT':
            return [...state, action.noteEvent]
        
        case 'CLEAR_NOTE_EVENTS':
            clearNotes(state)
            return []
        
        case 'EXPORT_NOTE_EVENTS':
            return []
        
        default:
            return state
    }
}