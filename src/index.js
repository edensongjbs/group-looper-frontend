import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './reducers/root'
import actionCable from 'actioncable'
import { wsUrl } from './settings/global_settings'
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

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

const CableApp = {}

// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
CableApp.cable = actionCable.createConsumer(wsUrl)
// const store = createStore(
//   shoppingListItemReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ); 

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <Router>
        <Switch>
        {/* <Route exact path="/compositions/:id" render={() => <Provider store={store}><App/></Provider>}/> */}
        <Route exact path="/" render={() => <App cableApp={CableApp}/>}/>
        <Route exact path="/:id" render={(browserProps) => <App cableApp={CableApp} id={browserProps.match.params.id}/>}/>
        
        </Switch>
      </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
