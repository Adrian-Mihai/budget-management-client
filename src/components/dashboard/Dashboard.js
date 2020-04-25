import React from "react";
import AppNavBar from "../app-navbar/AppNavBar";
import userService from "../../services/User";
import {Alert, Col, Container, Row} from "react-bootstrap";
import Transaction from "../transaction/Transaction";
import './Dashboard.css'
import transactionService from "../../services/Transaction";

class Dashboard extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      userUUID: '',
      userEmail: '',
      username: '',
      transactions: []
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

  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.state.userUUID !== prevState.userUUID){
      transactionService.index(this.state.userUUID).then(
        response => {
          this.setState({transactions: response.transactions});
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  render() {
    return(
      <div>
        <AppNavBar title='Dashboard' history={this.props.history}/>
        <Container className='custom-container'>
          {this.state.transactions.length ? this._transactions(this.state.transactions) : this._noTransactionsMessage()}
        </Container>
      </div>
    )
  };

  _transactions = (transactions) => (
    transactions.map((transaction, i) => {
      return(
        <Row key={i} className='custom-row'>
          <Col>
            <Transaction
              uuid={transaction.uuid}
              operator={transaction.operator}
              amount={transaction.amount}
              description={transaction.description}
              date={transaction.date}
            />
          </Col>
        </Row>
      )
    })
  )

  _noTransactionsMessage = () => (
    <Row>
      <Col>
        <Alert variant='info'>
          <Alert.Heading> You do not have any transactions</Alert.Heading>
          Click <Alert.Link href='#transaction'>here</Alert.Link> to add a new transaction
        </Alert>
      </Col>
    </Row>
  )
}

export default Dashboard;
