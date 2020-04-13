import React from "react";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';

import './SignUp.css'
import siteConstants from "../../helpers/site_constants";
import sitePaths from "../../helpers/site_paths";
import userService from "../../services/User";
import localStorageService from "../../services/LocalStorage";

class SignUp extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      requestInvalid: false,
      errorMessages: []
    };
  }

  render() {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(siteConstants.PASSWORD_LENGTH).required(),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'password confirmation must match password')
        .required('password confirmation is a required field')
    })
    return(
      <Container>
        <Row>
          <Col className='center'>
            <Card bg="dark" text="white">
              <Card.Header className="text-center" as="h2">Sign Up</Card.Header>
              <Button href={sitePaths.SIGN_IN} variant="outline-success" block>Sign In</Button>
              <Card.Body>
                <Formik
                  initialValues={{email: '', password: '', passwordConfirmation: ''}}
                  validationSchema={schema}
                  onSubmit={(values, {setSubmitting}) => {
                    userService.register(values).then(
                      response => {
                        localStorageService.setWithExp(siteConstants.TOKEN, response.token, response.expiration);
                        this.props.history.push(sitePaths.DASHBOARD);
                      },
                      error => {
                        this.setState({requestInvalid: true, errorMessages: error?.errors});
                        setSubmitting(false);
                      }
                    );
                  }}
                >
                  {({handleSubmit, handleChange, handleBlur, values, errors, isSubmitting}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId="user-email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="user-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="user-password-confirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" name="passwordConfirmation" value={values.passwordConfirmation} onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.passwordConfirmation} />
                        <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
                      </Form.Group>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
              { this.state.requestInvalid ? (<Card.Footer>{this.state.errorMessages.map((message, i) => { return (<Alert key={i} variant="danger">{message}</Alert>)})}</Card.Footer>) : null }
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SignUp;
