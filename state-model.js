export default const state = {
    composition:{}, //persisted
    transport:{

    }, 
    session: {
        tempoCoeff: 1.0,
        masterVol: 0,
        samplesLoaded: false
    },
    currentLayer: { // This does not to be in Redux state
        instrument: null, //Actual loaded instrument
        clearCurrentLayer: () => {},
        persistCurrentLayer: () => {} //send to backend
    },
    layers: [],
    users:
}

composition = {
    title:"",
    originalTempo: 120.0,
    beatsPerBar: 4,
    numBars: 4
}

layer = {
    instrument: null, // Actual loaded instrument, not persisted
    samplesLoaded: false, //not persisted
    instrumentName:"",
    noteEvents:[],
    volume: 0, // not persisted
    delete: () => {},
    muted: false // note persisted
}

/*
Actions:

'PLAY'
'PAUSE'
'STOP'

'LOAD_SOUND'

'MUTE_LAYER'
'UNMUTE_LAYER'
'DELETE_LAYER'
'SAVE_LAYER'

'CREATE_COMPOSITION'
'DELETE_COMPOSITION'