import React from "react";
import {Card, Button} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import siteConstants from "../../helpers/site_constants";
import './Transaction.css'
import transactionService from "../../services/Transaction";
import sitePaths from "../../helpers/site_paths";

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
          <Button className="custom-button" onClick={() => {this._editTransaction()}}>Edit</Button>
          <Button variant="danger" onClick={() => {this._deleteTransaction()}}>Delete</Button>
        </Card.Body>
        <Card.Footer className="text-center">{this.props.date}</Card.Footer>
      </Card>
    )
  }

  _editTransaction = () => {
    let path = `${sitePaths.EDIT_TRANSACTION}/${this.props.uuid}`;
    this.props.history.push(path);
  }

  _deleteTransaction = () => {
    transactionService.deleteTransaction(this.props.uuid).then(
      () => {
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }
}

export default withRouter(Transaction);
