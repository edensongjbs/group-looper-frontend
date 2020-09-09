import React from 'react'
import UsersContainer from './UsersContainer'
import LayersContainer from './LayersContainer'
import { connect } from 'react-redux'

class Sidebar extends React.Component {
    render() {
        return(
            this.props.loaded && this.props.loggedIn ?
            <div className="sidebar loaded">
                <UsersContainer/>
                <LayersContainer/>
            </div> 
            :
            <div className="sidebar unloaded">
                <img src="./hdt.gif"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.session.loggedIn,
    loaded: state.session.loaded,
    user: state.session.user
})

export default connect(mapStateToProps)(Sidebar)