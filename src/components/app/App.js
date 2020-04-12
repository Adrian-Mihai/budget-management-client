import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import sitePaths from "../../helpers/site_paths";
import history from "../../helpers/history";

import './App.css';
import SignIn from "../sign-in/SignIn";
import Dashboard from "../dashboard/Dashboard";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path={sitePaths.DASHBOARD} component={Dashboard}/>
          <Route exact path={sitePaths.SIGN_IN} component={SignIn} />
        </Switch>
      </Router>
    );
  }
}

export default App;
