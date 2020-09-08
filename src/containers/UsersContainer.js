import React from 'react'
import AddUserForm from '../components/AddUserForm'
import {connect} from 'react-redux'

class UsersContainer extends React.Component {

    state = {editing:false}

    submitHandler = (e) => {
        e.preventDefault()
        // this.props.addUser(this.state.name)
        alert('adding user')
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
                    <ul>
                        <li><div className="user-li"><button>X</button>UserName Here</div></li>
                    </ul>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    addUser: (name) => dispatch({type:'CHANGE_LAYER_NAME', name}),
    enableKeys: () => dispatch({type:'ENABLE_KEYS'}),
    disableKeys: () => dispatch({type:'DISABLE_KEYS'})
})

export default connect(null, mapDispatchToProps)(UsersContainer)