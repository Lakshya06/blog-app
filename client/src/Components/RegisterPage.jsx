import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../helper";

function RegisterPage(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleRegisterSubmit(event){

        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do Not Match, Try Again");
        }

        else{
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {'Content-type': 'application/json'}
            })
            if(response.status === 200){
                // props.setIsLogged(true);
                // console.log(props.isLogged);
                alert("Registration Successful, Login to Continue");
                setRedirect(true);
            }
            else{
                alert("Registration Failed!, Please try agian");
            }
        }
    } 

    if(redirect){
        return <Navigate to={'/login'}/>;
    }

    return (
        <>
        <Container className="carousel px-5" fluid="xs">
          <h1>REGISTER</h1>
        </Container>
        <main className="mx-2 mx-sm-auto">
          <h1 className="mb-5">Enter your Details to Register</h1>
          <Form className="loginForm" onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Username" 
                value={username}
                onChange={event => {
                    setUsername(event.target.value);
                }}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={event => {
                    setPassword(event.target.value);
                    // console.log(password);
                }}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Re-enter password "
                value={confirmPassword}
                onChange={event => {
                    setConfirmPassword(event.target.value)
                }}
                />
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