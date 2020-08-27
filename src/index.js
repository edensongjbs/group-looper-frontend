import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './reducers/root'
// import * as Tone from 'tone'

// const sampler = new Tone.Sampler({
//   urls: {
//     A1: "A1.mp3"
//   },
//   baseUrl: "./samples/piano/",
//   onload: () => {
//     console.log("sampler is ready!")
//     sampler.triggerAttackRelease("A1", 0.5)
//   }
// }).toDestination

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
