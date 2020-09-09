import {connect} from 'react-redux'
import React, { Component } from 'react'
import User from '../components/User'
import { removeUser } from '../actions/remove_user'

class Users extends React.Component {

    render() {
        return(
            <ul className="user-li">
                {this.props.users.map( user => {
                    return <User currentUser={this.props.currentUser} compId={this.props.compId} key={user.userName} user={user} remove={this.props.removeUser} compCreator={this.props.compositionCreator}/>
                })}
            </ul>
        )
    }
}



const mapStateToProps = (state) => ({
    compId: state.composition.id,
    compositionCreator: state.composition.creatorName,
    users: state.users,
    currentUser: state.session.user.userName
})

const mapDispatchToProps = (dispatch) => ({
    removeUser: (userName, compId) => dispatch(removeUser(userName, compId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)