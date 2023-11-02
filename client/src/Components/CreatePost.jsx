import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Button, Form } from "react-bootstrap";

function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    return (
        <>
            <Container className="carousel px-5" fluid="xs">
                <h1>NEW POST</h1>
            </Container>

            <main>


            <Container>
            <h2 className="mb-4">Fill in details for a new post</h2>
                <Form className="loginForm">
                    <Form.Group className="mb-4">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        type="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={pre => setTitle(pre.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Enter Summary</Form.Label>
                        <Form.Control
                        type="summary"
                        placeholder="Summary"
                        value={summary}
                        onChange={pre => setSummary(pre.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Choose Title Image</Form.Label>
                        <Form.Control
                        type="file"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Enter content</Form.Label>
                        <ReactQuill 
                        value={content} 
                        onChange={newVal => setContent(newVal)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mb-5 mt-4">
                Create Post
            </Button>

                </Form>
            </Container>

            </main>
        </>
    );
}

export default CreatePost;