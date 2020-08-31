import React from 'react'
import Layers from './Layers'

export default class LayersContainer extends React.Component {
    render(){
        return (
            <div className="layers">
                <div className="users-title">
                    <h3>Layers</h3>
                </div>
                <div className="layer-scroll">
                    <ul>
                        {<Layers/>}
                    </ul>
                </div>
            </div>
                
        )
    }
}