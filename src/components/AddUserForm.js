import React from 'react'
import { connect } from 'react-redux'

export default class AddUserForm extends React.Component {

    state = {name: ""}

    changeHandler = (e) => {
        this.setState({name: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.props.submitHandler}>
                <input type="text" onChange={this.changeHandler} value={this.state.name}/>
            </form>
        )
    }
}



