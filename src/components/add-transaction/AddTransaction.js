import React from "react";
import AppNavBar from "../app-navbar/AppNavBar";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import sitePaths from "../../helpers/site_paths";
import * as Yup from 'yup';
import transactionService from "../../services/Transaction";


class AddTransaction extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      requestInvalid: false,
      errorMessages: []
    };
  }

  render() {
    const schema = Yup.object({
      operator: Yup.string().required(),
      amount: Yup.number().positive().typeError('amount must be a number').required(),
    })

    return(
      <div>
        <AppNavBar title='Budget Planning' history={this.props.history} />
        <Container className='custom-container'>
          <Row>
            <Col>
              <Card bg="dark" text="white">
                <Card.Header className="text-center" as="h3">Transaction</Card.Header>
                <Card.Body>
                  <Formik
                    initialValues={{operator: '+', amount: '', description: ''}}
                    validationSchema={schema}
                    onSubmit={(values, {setSubmitting}) => {
                      transactionService.create(values).then(
                        () => {
                          this.props.history.push(sitePaths.DASHBOARD);
                          },
                        error => {
                          this.setState({requestInvalid: true, errorMessages: error?.errors});
                          setSubmitting(false);
                        });
                    }}
                  >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        isSubmitting
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="transaction-operator">
                          <Form.Control
                            as="select"
                            name="operator"
                            value={values.operator}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.operator}
                          >
                            <option value='+'>Income</option>
                            <option value='-'>Loss</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">{errors.operator}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="transaction-amount">
                          <Form.Label>Amount (Lei)</Form.Label>
                          <Form.Control
                            type="text"
                            name="amount"
                            value={values.amount}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={!!errors.amount}
                          />
                          <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="transaction-description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="description"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>Add</Button>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
                {this.state.requestInvalid ? this._errorMessages() : null}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  _errorMessages = () => (
    <Card.Footer>
      {
        this.state.errorMessages.map((message, i) => {
          return (
            <Alert key={i} variant="danger">
              {message}
            </Alert>
          )})
      }
    </Card.Footer>
  )
}

export default AddTransaction
