import React from "react";

import { Container, Button, Form } from "react-bootstrap";

function RegisterPage(){
    return (
        <>
        <Container className="carousel px-5" fluid="xs">
          <h1>REGISTER</h1>
        </Container>
        <main className="mx-2 mx-sm-auto">
          <h1 className="mb-5">Enter your Details to Register</h1>
          <Form className="loginForm">
            <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"/>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password"/>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Re-enter password "/>
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-5 mt-3">
                Register
            </Button>
          </Form>
        </main>
        </>
    );
}

export default RegisterPage;