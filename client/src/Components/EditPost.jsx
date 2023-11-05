import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Button, Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

function EditPost(){

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/posts/'+id)
        .then(res => {
            res.json().then(postInfo => {
                console.log(postInfo);
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    }, [])

    const editPost = async (event) => {
        event.preventDefault();
        console.log("Edit Post");

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        // data.set('file', )
        data.set('id', id);

        if(files?.[0]){
            data.set('file', files?.[0])
        }
        // data.set('file', files)
        const res = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });

        if(res.ok){
            setRedirect(true);
        }
    }


    if(redirect){
        return <Navigate to={'/posts/'+id}/>
    }

    return (
        <>
            <Container className="carousel px-5" fluid="xs">
                <h1>EDIT POST</h1>
            </Container>

            <main>

            <Container>
            <h2 className="mb-4">Edit details of Post</h2>
                <Form className="loginForm" onSubmit={editPost}>
                    <Form.Group className="mb-4">
                        <Form.Label>Edit Title</Form.Label>
                        <Form.Control
                        type="title"
                        placeholder="Title"
                        value={title}
                        onChange={pre => setTitle(pre.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Edit Summary</Form.Label>
                        <Form.Control
                        type="summary"
                        placeholder="Summary"
                        value={summary}
                        onChange={pre => setSummary(pre.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Edit Title Image</Form.Label>
                        <Form.Control
                        type="file"
                        onChange={pre => setFiles(pre.target.files)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Edit content</Form.Label>
                        <ReactQuill 
                        value={content} 
                        onChange={newVal => setContent(newVal)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mb-5 mt-4">
                Update Post
            </Button>

                </Form>
            </Container>

            </main>
        </>
    );
}

export default EditPost;