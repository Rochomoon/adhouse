//  Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'

// Imports
import PrivateRoute from '../utils/PrivateRoute'

import NavbarAH from '../layout/NavbarAH'
import { Home } from '../layout/Home'

import { Grid } from 'react-bootstrap'

import store from './store.js'


export class App extends React.Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>
    }
    let homeComponent = Home
   
    return (
      <div>
        <NavbarAH />
        <Grid fluid={true} >
          <Switch>
            <PrivateRoute exact={true} path="/" permiso={true} component={homeComponent} />
          </Switch>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default withRouter(connect(mapStateToProps)(App))