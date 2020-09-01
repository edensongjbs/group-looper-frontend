import React from 'react';
import './App.css';
import * as Tone from 'tone'
import Header from './containers/Header'
import TransportBar from './containers/TransportBar'
import KeyboardArea from './containers/KeyboardArea'
import Sidebar from './containers/Sidebar'
import Footer from './containers/Footer'
import {connect} from 'react-redux'


class App extends React.Component {
  // Tone.start()
  // Tone.Transport.start()

  // componentDidUpdate = () => {
  //   console.log('updating composition', this.props.id)
  //   this.props.updateComposition(this.props.id)
  // }

  // componentDidMount = () => {
  //   console.log('mounting composition', this.props.id)
  //   this.props.updateComposition(this.props.id)
  // }


  render() {
    return (
      <div className="wrapper">
        <Header/>
        <TransportBar id={this.props.id}/>
        <KeyboardArea id={this.props.id}/>
        <Sidebar id={this.props.id}/>
        <Footer/>
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return { addLayer: (layer) => dispatch(addLayer(layer)) }
// }

const mapDispatchToProps = (dispatch) => ({
  updateComposition: (compositionId) => dispatch({type:'UPDATE_COMPOSITION', compositionId})
})

// const mapStateToProps = (state) => ({

// })


export default connect(null, mapDispatchToProps)(App)
