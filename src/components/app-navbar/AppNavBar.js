import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {withRouter} from 'react-router-dom';

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
            <Nav.Link href={sitePaths.ADD_TRANSACTION}>Add Transaction</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => this._logOut()}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  };

  _logOut = () => {
    userService.logOut();
    this.props.history.push(sitePaths.SIGN_IN);
  }
}

export default withRouter(AppNavBar);
