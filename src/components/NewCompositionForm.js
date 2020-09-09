import React from 'react'
import { connect } from 'react-redux'
import { createNewComposition } from '../actions/create_new_composition'

class NewCompositionForm extends React.Component {
    state = {title:"", timeSigNum:4, timeSigDenom:4, numBars:2, origTempo:120.0}

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.createNewComposition(this.state)
    }

    changeForm = (e) => {
        e.preventDefault()
        // this.props.clearErrors()
        this.props.switchForm()
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
                    <label htmlFor="title" >Name</label>
                    <input onChange={this.changeHandler} type="text" name="title" placeholder="A Glorious New Work" value={this.state.name}/><br/><br/>
                    <label htmlFor="origTempo">Tempo</label>
                    <input onChange={this.changeHandler} type="number" step="0.5" name="origTempo" value={this.state.tempo}/><br/><br/>
                    <label htmlFor="numBars">Number of Bars</label>
                    <input onChange={this.changeHandler} type="number" name="numBars" value={this.state.numBars}/><br/><br/>
                    <label htmlFor="timeSigNum">Beats per Bar</label>
                    <input onChange={this.changeHandler} type="number" name="timeSigNum" value={this.state.timeSigNum}/><br/><br/>
                    <input type="submit"/>
                </form><br/><br/>
                <a href="" onClick={this.changeForm}>Click Here to Choose A Composition!</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errorMessages: state.session.errorMessages
})

const mapDispatchToProps = (dispatch) => ({
    switchForm: () => dispatch({type:'SWITCH_COMP_FORM', formValue:'SELECT_COMPOSITION'}),
    createNewComposition: (composition) => dispatch(createNewComposition(composition))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCompositionForm)