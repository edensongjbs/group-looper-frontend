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

    render(){
        return(
            <div type="new-comp=form">
                <form onSubmit={this.submitHandler}>
                    <label for="title" >Name</label>
                    <input onChange={this.changeHandler} type="text" name="title" placeholder="A Glorious New Work" value={this.state.name}/><br/><br/>
                    <label for="origTempo">Tempo</label>
                    <input onChange={this.changeHandler} type="number" step="0.5" name="origTempo" value={this.state.tempo}/><br/><br/>
                    <label for="numBars">Number of Bars</label>
                    <input onChange={this.changeHandler} type="number" name="numBars" value={this.state.numBars}/><br/><br/>
                    <label for="timeSigNum">Beats per Bar</label>
                    <input onChange={this.changeHandler} type="number" name="timeSigNum" value={this.state.timeSigNum}/><br/><br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    createNewComposition: (composition) => dispatch(createNewComposition(composition))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCompositionForm)