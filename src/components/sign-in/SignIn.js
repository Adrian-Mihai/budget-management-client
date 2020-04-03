import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';

class SignIn extends React.Component {
  render() {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    return (
      <Container>
        <Row className="justify-content-sm-center">
          <Col sm={6}>
            <Card>
              <Card.Header className="text-center" as="h2">Sign In</Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{email: '', password: ''}}
                  validationSchema={schema}
                  onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                      console.log(values);
                      setSubmitting(false);
                    }, 500)
                  }}
                >
                  {({handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      errors,
                      isSubmitting}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId="user-email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.email}
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="user-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.password}
                          isValid={touched.password && !errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignIn;
