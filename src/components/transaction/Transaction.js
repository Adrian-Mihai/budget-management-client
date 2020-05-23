import React from "react";
import {Card, Button} from "react-bootstrap";
import siteConstants from "../../helpers/site_constants";
import './Transaction.css'
import transactionService from "../../services/Transaction";

class Transaction extends React.Component{

  render() {
    return(
      <Card bg="dark" text='white'>
        <Card.Header className="text-center" as="h4">
          {this.props.operator === siteConstants.PLUS ? 'Income' : 'Loss'}
        </Card.Header>
        <Card.Body>
          <Card.Title className={this.props.operator === siteConstants.PLUS ? 'income' : 'loss'}>
            {`${this.props.operator} ${this.props.amount}`}
          </Card.Title>
          <Card.Text className={!this.props.description ? 'text-muted' : ''}>
            {this.props.description ? this.props.description : 'No description'}
          </Card.Text>
          <Button className="custom-button">Edit</Button>
          <Button variant="danger" onClick={() => {this._deleteTransaction(this.props.uuid)}}>Delete</Button>
        </Card.Body>
        <Card.Footer className="text-center">{this.props.date}</Card.Footer>
      </Card>
    )
  }

  _deleteTransaction = uuid => {
    transactionService.deleteTransaction(uuid).then(
      () => {
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }
}

export default Transaction;
