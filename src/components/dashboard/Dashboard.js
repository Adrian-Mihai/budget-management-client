import React from "react";
import AppNavBar from "../app-navbar/appNavBar";
import userService from "../../services/User";

class Dashboard extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      user_uuid: '',
      user_email: '',
      username: ''
    };
  }

  componentDidMount() {
    userService.userInformation().then(
      response => {
        this.setState({
          user_uuid: response?.user_uuid,
          user_email: response?.user_email,
          username: response?.username
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    return(
      <AppNavBar title='Dashboard' history={this.props.history} username={this.state.username} />
    )
  };
}

export default Dashboard;
