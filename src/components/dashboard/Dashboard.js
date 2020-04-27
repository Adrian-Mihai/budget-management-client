import React from "react";
import AppNavBar from "../app-navbar/AppNavBar";
import userService from "../../services/User";
import {Alert, Col, Container, Row} from "react-bootstrap";
import Transaction from "../transaction/Transaction";
import './Dashboard.css'
import transactionService from "../../services/Transaction";
import InfiniteScroll from 'react-infinite-scroller';

class Dashboard extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      hasMoreTransactions: true,
      hasNoTransactions: false,
      totalPages: 1,
      transactions: []
    };
  }

  render() {
    return(
      <div>
        <AppNavBar title='Dashboard' history={this.props.history}/>
        <Container className='custom-container'>
          {(
            <InfiniteScroll
              loadMore={this._getTransactions}
              hasMore={this.state.hasMoreTransactions}
              loader={<Row key={0}><Col><Alert className="text-center" variant='info'>Loading ...</Alert></Col></Row>}
            >
              {!this.state.hasNoTransactions ? this._transactions(this.state.transactions) : this._noTransactionsMessage()}
            </InfiniteScroll>
          )}
        </Container>
      </div>
    )
  };

  _getTransactions = (page) => {
    if(page > this.state.totalPages) {
      this.setState({
        hasMoreTransactions: false
      });
      return
    }
    userService.userInformation().then(
      response => {
        transactionService.index(response.user_uuid, page).then(
          response => {
            if(response.total_pages === 0){
              this.setState({
                hasMoreTransactions: false,
                hasNoTransactions: true
              });
              return
            }
            this.setState({
              transactions: this.state.transactions.concat(response.transactions),
              totalPages: response.total_pages
            });
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

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
