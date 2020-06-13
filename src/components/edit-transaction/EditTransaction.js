import React from "react";
import AppNavBar from "../app-navbar/AppNavBar";
import siteConstants from "../../helpers/site_constants";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import transactionService from "../../services/Transaction";
import sitePaths from "../../helpers/site_paths";

class EditTransaction extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      operator: '',
      amount: '',
      description: '',
      requestInvalid: false,
      errorMessages: []
    };
  }

  componentDidMount() {
    transactionService.show(this.props.match.params.id).then(
      response => {
        this.setState({
          uuid: response?.uuid,
          operator: response?.operator,
          amount: response?.amount.replace(/,/g, ' '),
          description: response?.description
        });
      },
      error => {console.log(error)}
    )
  }

  render() {
    const schema = Yup.object({
      operator: Yup.string().required(),
      amount: Yup.number().positive().typeError('amount must be a number').required(),
    })

    return(
      <div>
        <AppNavBar title={siteConstants.TITLE}/>
        <Container className='custom-container'>
          <Row>
            <Col>
              <Card bg="dark" text="white">
                <Card.Header className="text-center" as="h3">Transaction</Card.Header>
                <Card.Body>
                  <Formik
                    initialValues={this.state}
                    enableReinitialize={true}
                    validationSchema={schema}
                    onSubmit={(values, {setSubmitting}) => {
                      transactionService.update(values).then(
                        response => {
                          this.props.history.push(sitePaths.DASHBOARD);
                        },
                        error => {
                          this.setState({requestInvalid: true, errorMessages: error?.errors});
                          setSubmitting(false);
                        }
                      );
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
                        <Button variant="primary" type="submit" disabled={isSubmitting}>Update</Button>
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

export default EditTransaction;
