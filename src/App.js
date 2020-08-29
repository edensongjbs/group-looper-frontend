import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as Tone from 'tone'
import {connect} from 'react-redux'
import { v4 as uuid } from 'uuid'
import Header from './containers/Header'
import TransportBar from './containers/TransportBar'
import KeyboardArea from './containers/KeyboardArea'
import Sidebar from './containers/Sidebar'
import Footer from './containers/Footer'


function App(props) {
  Tone.start()
  Tone.Transport.start()
  return (
    <div className="wrapper">
      <Header/>
      <TransportBar/>
      <KeyboardArea/>
      <Sidebar/>
      <Footer/>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return { addLayer: (layer) => dispatch(addLayer(layer)) }
// }


export default App
