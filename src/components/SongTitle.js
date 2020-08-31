import React from 'react'
import composition from '../reducers/composition'
import { connect } from 'react-redux'

class SongTitle extends React.Component {
    render() {
        return (
        <div className="song-title"><h3>{this.props.songTitle}</h3></div>
        )
    }
}

const mapStateToProps = (state) => ({songTitle: state.composition.title})

export default connect(mapStateToProps)(SongTitle)