import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import localStorageService from "../../services/LocalStorage";
import sitePaths from "../../helpers/site_paths";
import siteConstants from "../../helpers/site_constants";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorageService.getWithExp(siteConstants.TOKEN);
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest} render={props => this.token ? (<Component {...props}/>) : (<Redirect to={{ pathname: sitePaths.SIGN_IN, state: { from: props.location } }} /> )}/>
    )
  }
}

export default PrivateRoute;

