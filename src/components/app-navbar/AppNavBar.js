import React from "react";
import {Nav, Navbar} from "react-bootstrap";

import userService from "../../services/User";
import sitePaths from "../../helpers/site_paths";

class AppNavBar extends React.Component{

  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm" sticky="top">
        <Navbar.Brand href={sitePaths.DASHBOARD}>{this.props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#account">Account</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => this._logOut(this.props.history)}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  };

  _logOut = (history) => {
    userService.logOut();
    history.push(sitePaths.SIGN_IN);
  }
}

export default AppNavBar;
