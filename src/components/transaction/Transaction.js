import React from "react";
import {Card} from "react-bootstrap";
import siteConstants from "../../helpers/site_constants";
import './Transaction.css'

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
          <Card.Link href="#">Edit</Card.Link>
          <Card.Link href="#">Delete</Card.Link>
        </Card.Body>
        <Card.Footer className="text-center">{this.props.date}</Card.Footer>
      </Card>
    )
  }
}

export default Transaction;
