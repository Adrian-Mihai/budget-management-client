import React from "react";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import userService from "../../services/User";
import localStorageService from "../../services/LocalStorage";
import sitePaths from "../../helpers/site_paths";
import siteConstants from "../../helpers/site_constants";

import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestValid: true,
      errorMessage: ''
    };

    if(localStorageService.getWithExp(siteConstants.TOKEN)){
      this.props.history.push(sitePaths.DASHBOARD);
    }
  }
  render() {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    return (
      <Container>
        <Row>
          <Col className='center'>
            <Card bg="dark" text='white'>
              <Card.Header className="text-center" as="h2">Sign In</Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{email: '', password: ''}}
                  validationSchema={schema}
                  onSubmit={(values, {setSubmitting}) => {
                    userService.login(values).then(
                      response => {
                        localStorageService.setWithExp(siteConstants.TOKEN, response.token, response.expiration);
                        const { from } = this.props.location.state || { from: { pathname: sitePaths.DASHBOARD } };
                        this.props.history.push(from);
                      },
                      error => {
                        this.setState({requestValid: false, errorMessage: error?.error});
                        setSubmitting(false);
                      }
                    );
                  }}
                >
                  {({handleSubmit, handleChange,handleBlur, values, touched, errors, isSubmitting}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId="user-email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.email} isValid={touched.email && !errors.email}/>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="user-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
              { !this.state.requestValid ? (<Card.Footer><Alert variant="danger">{this.state.errorMessage}</Alert></Card.Footer>) : null }
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignIn;
