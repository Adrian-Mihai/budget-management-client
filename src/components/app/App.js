import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import sitePaths from "../../helpers/site_paths";

import './App.css';
import SignIn from "../sign-in/SignIn";
import Dashboard from "../dashboard/Dashboard";
import SignUp from "../sign-up/signUp";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path={sitePaths.DASHBOARD} component={Dashboard}/>
          <Route exact path={sitePaths.SIGN_IN} component={SignIn} />
          <Route exact path={sitePaths.SIGN_UP} component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default App;
