import React from 'react'
import { connect } from 'react-redux'
import { fetchCompositions } from '../actions/fetch_compositions'
import CompOption from './CompOption'

class SelectCompositionForm extends React.Component {
    // state = {title:"", timeSigNum:4, timeSigDenom:4, numBars:2, origTempo:120.0}

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.createNewComposition(this.state)
    }

    componentDidMount = () => {
        this.props.fetchCompositions()
    }

    compositions = () => {
        return this.props.compositions.map(comp => <CompOption key={comp.id} comp={comp}/>)
    }

    submitHandler = (e) => {
        e.preventDefault()
        window.history.pushState({pathname:`/${e.target[0].value}`}, "", `/${e.target[0].value}`)
        window.location.reload()
    }

    changeForm = (e) => {
        e.preventDefault()
        // this.props.clearErrors()
        this.props.switchForm()
    }

    render(){
       
        return(
            <div type="new-comp-form">
                <form onSubmit={this.submitHandler}>
                    <select className="comp-select">
                        {this.compositions()}
                    </select><br/><br/>
                    <input type="submit" value="Choose Composition"/>
                </form><br/><br/>
                <a href="" onClick={this.changeForm}>Click Here to Start a New Composition!</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    compositions: state.compositionList
})

const mapDispatchToProps = (dispatch) => ({
    switchForm: () => dispatch({type:'SWITCH_COMP_FORM', formValue:'NEW_COMPOSITION'}),
    fetchCompositions: () => dispatch(fetchCompositions())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCompositionForm)