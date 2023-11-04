import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import { formatISO9075 } from "date-fns";

function PostPage(){

    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        console.log(id);
        fetch(`http://localhost:4000/posts/${id}`).then(res => {
            res.json().then(postInfo => {
                setPostInfo(postInfo);
                console.log(postInfo);
            })
        })
    }, [])

    if(!postInfo) return ' ';

    return(
        <>
        <Container className="carousel px-5 mb-5" fluid="xs">
            <h1>{postInfo.title}</h1>
        </Container>

        <main>
        <Container className="single-post">

<Row>

    <Col>
    <img src={`http://localhost:4000/${postInfo.cover}`} className="img-fluid my-4" alt="post-cover"/>
    </Col>

    {/* <Col> */}
        <h1 className="my-3">{postInfo.title}</h1>
        
    {/* </Col> */}

        <div className="user-details mb-3">
             By,<a href="#">{postInfo.author.username}</a>
             
             <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        </div>

    <h4 className="mb-4">{postInfo.summary}</h4>

    <div dangerouslySetInnerHTML={{__html:postInfo.content}} className="mt-4 post-content"/>
</Row>

</Container>
        </main>
        </>
    );
}

export default PostPage;