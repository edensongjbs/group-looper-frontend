import React from 'react'
import UsersContainer from './UsersContainer'
import LayersContainer from './LayersContainer'

export default class Sidebar extends React.Component {
    render() {
        return(
            <div className="sidebar">
                <UsersContainer/>
                <LayersContainer/>
            </div>
        )
    }
}