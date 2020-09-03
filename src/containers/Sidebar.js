import React from 'react'
import UsersContainer from './UsersContainer'
import LayersContainer from './LayersContainer'
import { connect } from 'react-redux'

class Sidebar extends React.Component {
    render() {
        return(
            this.props.loaded && this.props.user ?
            <div className="sidebar loaded">
                <UsersContainer/>
                <LayersContainer/>
            </div> 
            :
            <div className="sidebar unloaded">
                <h2>We can use this area for something fun</h2>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loaded: state.session.loaded,
    user: state.session.user
})

export default connect(mapStateToProps)(Sidebar)