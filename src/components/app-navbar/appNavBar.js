import React from "react";
import {Button, Nav, Navbar} from "react-bootstrap";

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
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href={sitePaths.USER_EDIT}>{this.props.username}</Nav.Link>
            <Button onClick={() => this._logOut(this.props.history)} variant="outline-success">Sign Out</Button>
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
