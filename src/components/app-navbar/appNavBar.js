import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

import userService from "../../services/User";
import sitePaths from "../../helpers/site_paths";

class AppNavBar extends React.Component{

  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm" >
        <Navbar.Brand href={sitePaths.DASHBOARD}>{this.props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{marginRight: 35}}>
          <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => this._logOut(this.props.history)}>Log Out</NavDropdown.Item>
            </NavDropdown>
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
