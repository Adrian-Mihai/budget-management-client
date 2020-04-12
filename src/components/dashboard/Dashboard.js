import React from "react";
import AppNavBar from "../app-navbar/appNavBar";

class Dashboard extends React.Component{
  render() {
    return(
      <AppNavBar title='Dashboard' history={this.props.history}/>
    )
  };
}

export default Dashboard;
