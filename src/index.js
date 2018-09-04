import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Jquery from 'jquery'

// import './dist/css/poncho.css'
// import './dist/css/app.scss'
import 'react-select/dist/react-select.css'
// import './dist/css/draft.css'


import store from './app/store.js'
import App from './app/App'
import history from './history'

ReactDOM.render(
  (<Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>),
  document.getElementById('root'))
