import React from "react";
import AppNavBar from "../app-navbar/AppNavBar";
import userService from "../../services/User";
import {Col, Container, Row} from "react-bootstrap";

class Dashboard extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      userUUID: '',
      userEmail: '',
      username: ''
    };
  }

  componentDidMount() {
    userService.userInformation().then(
      response => {
        this.setState({
          userUUID: response?.user_uuid,
          userEmail: response?.user_email,
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
      <div>
        <AppNavBar title='Dashboard' history={this.props.history} username={this.state.username} />
        <Container>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </div>
    )
  };
}

export default Dashboard;
