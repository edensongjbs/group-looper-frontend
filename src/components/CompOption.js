import React from 'react'

export default class CompOption extends React.Component {
    
    render(){
        
        return (<option value={this.props.comp.id}>{this.props.comp.title}</option>)
    }
}