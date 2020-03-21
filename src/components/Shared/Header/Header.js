import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../../images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#my-topics">My Topics</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="navbar-custom" expand="md">
    <Navbar.Brand href="https://www.linkedin.com/in/shantalanarayan/" target="_blank">
      <img
        width="60"
        height="60"
        src={logo}
        className="d-inline-block align-top"
        alt=""
      />{' '}
      Quiz-Up
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
      { user &&
        <Nav className="ml-auto">
          <NavDropdown title={
            <i>
              <FontAwesomeIcon icon={faUser}/> { user.email }
            </i>
          } id="collasible-nav-dropdown">
            <NavDropdown.Item href="#sign-out"><i>Sign Out</i></NavDropdown.Item>
          </NavDropdown>
        </Nav>
      }
    </Navbar.Collapse>
  </Navbar>
)

export default Header
