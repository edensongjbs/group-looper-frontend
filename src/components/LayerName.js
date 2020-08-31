import React from 'react'
import { connect } from 'react-redux'

class LayerName extends React.Component {

    state = {name: this.props.layerName, editing: false}

    changeHandler = (e) => {
        this.setState({name: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.changeLayerName(this.state.name)
        this.props.enableKeys()
        this.setState(()=>({editing:false}))
    }

    doubleClickHandler = (e) => {
        this.setState(()=>({editing: true}))
        this.props.disableKeys()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.layerName !== this.props.layerName) {
            this.setState({name:this.props.layerName})
        }
    }

    render() {
        return (
        <div className="layer-name">
            {this.state.editing ?
            <form onSubmit={this.submitHandler}>
                <input type="text" onChange={this.changeHandler} value={this.state.name}/>
            </form> : 
            <h4 onDoubleClick={this.doubleClickHandler}>{this.state.name}</h4>}
        </div>
        )
    }
}

const mapStateToProps = (state) => ({layerName: state.layerName})

const mapDispatchToProps = (dispatch) => ({
    changeLayerName: (name) => dispatch({type:'CHANGE_LAYER_NAME', name}),
    enableKeys: () => dispatch({type:'ENABLE_KEYS'}),
    disableKeys: () => dispatch({type:'DISABLE_KEYS'})
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerName)