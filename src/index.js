import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { DataLayer } from './context/DataLayer'
import reducer, { initialState } from './context/reducer'



ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </Router>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();

if (module.hot) {
  module.hot.accept()
}
