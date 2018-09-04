import React from 'react'
import { Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, img } from 'react-bootstrap'
import logo from '../dist/img/logo.svg'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

var divStyle = {
  paddingTop: '15px',
  paddingBottom: '15px',
  backgroundColor: '#FFFFFF',
  listStyle: 'none'
}

export class NavbarAH extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Grid style={divStyle} fluid={true}>
          <Row>
          
            
          </Row>
        </Grid>
        <Navbar fluid={true} bsStyle="inverse">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/">
                <NavItem  >Escenario</NavItem>
              </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatch = (dispatch) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatch)(NavbarAH))