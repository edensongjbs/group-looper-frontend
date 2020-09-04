import React from 'react'
import { connect } from 'react-redux'
import { signupUser } from '../actions/signup_user'

class SignupForm extends React.Component {
    state = {userName:"", name:"", email:"", password:"", confirmPassword:"", errors:null}

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.clearErrors()
        console.log("trying to submit")
        this.props.signupUser(this.state)
    }

    changeForm = (e) => {
        this.props.clearErrors()
        e.preventDefault()
        this.props.switchForm('LOG_IN')
    }

    render(){
        return(
            <div type="new-comp-form">
                    {this.props.errorMessages.length>0 ? 
                    <ul className="error-messages">
                        {this.props.errorMessages.map((em,i) => (<li key={i}>{em}</li>))}
                    </ul>
                    : null}
                    {this.state.errors ? "There's an error" : null}
                    <form onSubmit={this.submitHandler}><label htmlFor="name" >Name</label>
                    <input onChange={this.changeHandler} type="text" name="name" placeholder="Guybrush Threepwood" value={this.state.name}/><br/><br/>
                    <label htmlFor="email" >Email</label>
                    <input onChange={this.changeHandler} type="text" name="email" placeholder="guybrush@threepwood.com" value={this.state.email}/><br/><br/>
                    <label htmlFor="userName" >Username</label>
                    <input onChange={this.changeHandler} type="text" name="userName" placeholder="GuybrushThreepwood5403" value={this.state.userName}/><br/><br/>
                    <label htmlFor="password">Password</label>
                    <input onChange={this.changeHandler} type="password" name="password" value={this.state.password}/><br/><br/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input onChange={this.changeHandler} type="password" name="confirmPassword" value={this.state.confirmPassword}/><br/><br/>
                    <input type="submit" value="Create User"/><br/><br/>
                    <a href="" onClick={this.changeForm}>Already Have an Account?  Click Here to Login!</a>
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
    signupUser: (newUserInfo) => dispatch(signupUser(newUserInfo)),
    switchForm: (formValue) => dispatch({type:'SWITCH_USER_FORM', formValue})
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)