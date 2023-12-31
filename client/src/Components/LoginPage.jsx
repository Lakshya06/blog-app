import React, { useContext, useState } from "react";

import { Container, Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BASE_URL } from "../helper";

function LoginPage(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function handleLogin(ev){
        ev.preventDefault();
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-type': 'application/json'},
            credentials: 'include',
        })

        if(res.ok){
            res.json().then(userInfo => {
                // <Alert key="primary" variant="primary">Logged In</Alert>
                props.setIsLogged(true);
                setRedirect(true);
                setUserInfo(userInfo);
            })
        }
        else{
            alert("Wrong Credentials!");
        }
    }
    if(redirect){
        return <Navigate to={'/'} />
    }
    return (
        <>
        <Container className="carousel px-5" fluid="xs">
          <h1>LOGIN</h1>
        </Container>
        <main className="mx-2 mx-sm-auto">
          <h1 className="mb-5">Enter your Details to Login</h1>
          <Form className="loginForm" onSubmit={handleLogin}>
            <Form.Group className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Username"
                value={username}
                onChange={pre => setUsername(pre.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={pre => setPassword(pre.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-5 mt-3">
                Login
            </Button>
          </Form>
        </main>
        </>
    );
}

export default LoginPage;