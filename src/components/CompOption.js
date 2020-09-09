import React from 'react'

export default class CompOption extends React.Component {
    
    render(){
        console.log(this.props)
        return (<option value={this.props.comp.id}>{this.props.comp.title}</option>)
    }
}