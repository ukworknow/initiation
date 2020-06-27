import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Formik, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
} from "reactstrap";

import { history } from "../histroy";

const Title = styled.h2`
  color: black;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const SubmitButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const ErrorMsg = styled.span`
  color: red;
  text-align: center;
`;
interface FormValues {
  username: string;
  password: string;
  error: string;
}

function Login() {
  useEffect(() => {
    if (localStorage.getItem("accessToken")) history.push("/dashboard");
  }, []);

  return (
    <Container>
      <Title>LogIn</Title>
      <Formik
        initialValues={{ username: "", password: "", error: "" }}
        onSubmit={async (
          values: FormValues,
          { setSubmitting, setErrors, resetForm }: FormikHelpers<FormValues>
        ) => {
          setSubmitting(true);
          /**
           * Credential
           *
           * @author lurii
           *
           * username: initiate
           * password: illuminated
           */
          try {
            const response = await axios.post(
              "https://api.intelliscan.io/user/sign-in/",
              values
            );
            localStorage.setItem("accessToken", response.data.token);
            history.push("/dashboard");
          } catch (e) {
            setErrors({ error: "Username or password is incorrect" });
            setSubmitting(false);
          }
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required."),
          password: Yup.string()
            .required("Password is required.")
            .min(8, "Password is too short - should be 8 chars minimum."),
        })}
      >
        {(props: FormikProps<FormValues>) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <Form className="form" onSubmit={handleSubmit}>
              {errors.error && (
                <Row>
                  <Col sm={2}></Col>
                  <Col sm={10}><ErrorMsg>{errors.error}</ErrorMsg></Col>
                </Row>
              )}
              <FormGroup row>
                <Label for="email" sm={2}>
                  UserName
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={!!(errors.username && touched.username)}
                    placeholder="Enter a username"
                  />
                  {errors.username && touched.username && (
                    <FormFeedback>{errors.username}</FormFeedback>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Password" sm={2}>
                  Password
                </Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={!!(errors.password && touched.password)}
                    placeholder="Enter Password"
                  />
                  {errors.password && touched.password && (
                    <FormFeedback>{errors.password}</FormFeedback>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={2} />
                <Col sm={8}>
                  <SubmitButton block disabled={isSubmitting} color="success">
                    Submit
                  </SubmitButton>
                </Col>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default Login;
