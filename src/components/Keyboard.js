import React from 'react'

export default class Keyboard extends React.Component {

    highlighted = (noteName) => this.props.playingNotes[noteName]

    render() {
        return (
            <div id="keyboard">
                <div className="all-white-notes">
                <div className={`white-note${this.highlighted("C4") ? " playing" : ""}`} id="C4"></div>
                <div className={`white-note${this.highlighted("D4") ? " playing" : ""}`} id="D4"></div>
                <div className={`white-note${this.highlighted("E4") ? " playing" : ""}`} id="E4"></div>
                <div className={`white-note${this.highlighted("F4") ? " playing" : ""}`} id="F4"></div>
                <div className={`white-note${this.highlighted("G4") ? " playing" : ""}`} id="G4"></div>
                <div className={`white-note${this.highlighted("A4") ? " playing" : ""}`} id="A4"></div>
                <div className={`white-note${this.highlighted("B4") ? " playing" : ""}`} id="B4"></div>
                <div className={`white-note${this.highlighted("C5") ? " playing" : ""}`} id="C5"></div>
                </div>
                <div className={`black-note${this.highlighted("C#4") ? " playing" : ""}`} id="C#4"></div>
                <div className={`black-note${this.highlighted("D#4") ? " playing" : ""}`} id="D#4"></div>
                <div className={`black-note${this.highlighted("F#4") ? " playing" : ""}`} id="F#4"></div>
                <div className={`black-note${this.highlighted("G#4") ? " playing" : ""}`} id="G#4"></div>
                <div className={`black-note${this.highlighted("A#4") ? " playing" : ""}`} id="A#4"></div>
            </div>
        )
    }
}