import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

export class PrivateRoute extends React.Component {
  
  constructor() {
    super()
    this.state = {
      redirect: []
    }
  }

  dondeRedirigir(){

      return <Route exact={this.props.exact} path={this.props.path} component={this.props.component} />
    
  }

  render() {
    return (
      <div>
        {
          this.dondeRedirigir()    
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))