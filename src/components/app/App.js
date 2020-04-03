import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import SignIn from "../sign-in/SignIn";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route extract path="/sign-in">
            <SignIn/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
