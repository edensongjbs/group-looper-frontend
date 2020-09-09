import React from 'react'
import AddUserForm from '../components/AddUserForm'
import {connect} from 'react-redux'
import {addUser} from '../actions/add_user'
import Users from './Users'

class UsersContainer extends React.Component {

    state = {editing:false}

    submitHandler = (e) => {
        e.preventDefault()
        this.props.addUser(e.target[0].value, this.props.compositionId)
        this.props.enableKeys()
        this.setState(()=>({editing:false}))
    }

    clickHandler = (e) => {
        this.setState(()=>({editing: true}))
        this.props.disableKeys()
    }

    render(){
        return (
            <div className="users">
                <div className="users-title">
                    {this.state.editing ? <AddUserForm submitHandler={this.submitHandler}/> 
                    :<h3><button onClick={this.clickHandler} className="add-user">+</button>Users</h3>}
                </div>
                <div className="user-scroll">
                    {/* <ul>
                        <li><div className="user-li"><button>X</button>UserName Here</div></li>
                    </ul> */}
                    <Users/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({compositionId: state.composition.id})


const mapDispatchToProps = (dispatch) => ({
    addUser: (name, composition) => dispatch(addUser(name, composition)),
    enableKeys: () => dispatch({type:'ENABLE_KEYS'}),
    disableKeys: () => dispatch({type:'DISABLE_KEYS'})
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)