import React from 'react';
import logo from '../dist/img/logo.svg'
import { Grid, Row, Col, Button, Nav, Navbar, NavItem, NavDropdown, NavbarBrand, MenuItem, img } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer className="main-footer sticky-footer">
      <Grid fluid={true}>
        <Row>
          <Col md={6}>
            <img className="image-responsive" src={logo} width="300px"/>
            <br />
            <p className="text-muted small">Versión 0.0.0</p>
          </Col>
          <Col md={6}>
          </Col>
        </Row>
      </Grid>
    </footer> 
  )
};