import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/login_user'

class LoginForm extends React.Component {
    state = {userName:"", password:""}

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.clearErrors()
        if (this.state.userName.includes('@')) {
            this.props.loginUser({password:this.state.password, email:this.state.userName})
        }
        else {
            this.props.loginUser(this.state)
        }
    }

    changeForm = (e) => {
        e.preventDefault()
        this.props.clearErrors()
        this.props.switchForm('NEW_USER')
    }

    render(){
        return(
            <div type="new-comp-form">
                {this.props.errorMessages.length>0 ? 
                <ul className="error-messages">
                    {this.props.errorMessages.map((em,i) => (<li key={i}>{em}</li>))}
                </ul>
                : null}
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="userName" >User Name or Email</label>
                    <input onChange={this.changeHandler} type="text" name="userName" placeholder="Your Username or Email" value={this.state.name}/><br/><br/>
                    <label htmlFor="password">Password</label>
                    <input onChange={this.changeHandler} type="password" step="0.5" name="password" value={this.state.password}/><br/><br/>
                    <input type="submit" value="Log In"/><br/><br/>
                    <a href="" onClick={this.changeForm}>Don't Have a Free Account Yet?  Click here to register!</a>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errorMessages: state.session.errorMessages
})

const mapDispatchToProps = (dispatch) => ({
    clearErrors: () => dispatch({type:'CLEAR_ERRORS'}),
    loginUser: (user) => dispatch(loginUser(user)),
    switchForm: (formValue) => dispatch({type:'SWITCH_USER_FORM', formValue})
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)