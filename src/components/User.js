import React from 'react'


export default class User extends React.Component {
    
    undeletable = () => {
        return ((this.props.currentUser !== this.props.user.userName) && (this.props.currentUser !== this.props.compCreator))
    }

    render() {
        return(
            <li>
                <div className="layer-li">{this.undeletable() ? null : <button onClick={() => this.props.remove(this.props.user.userName, this.props.compId)}>X</button>}<span>{this.props.user.userName}{this.props.user.userName===this.props.currentUser? " (you)" : null}</span></div>
            </li>
        )
    }
}