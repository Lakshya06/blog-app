import React from "react";
import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import { BASE_URL } from "../helper";

function Post({_id ,title, summary, cover, createdAt, author}){
    // console.log(cover);
    return (
        <div className="post mt-5">
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                    <Link to={`/posts/${_id}`}>
                        <img src={`${BASE_URL}/`+cover} alt="post-title" className="img-fluid mx-auto d-block my-4"/>
                    </Link>
                    </Col>
                    <Col xs={12} md={6}>
                    <div className="content">
                        <Link to={`/posts/${_id}`}>
                            <h3 className="my-3">{title}</h3>
                        </Link>
                        <p className="summary">{summary}.</p>
                        <div className="author-info me-sm-5">
                            By, 
                            <a href="#">{author.username}</a>
                            <time>{formatISO9075(new Date(createdAt))}</time>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
                    <hr />
        </div>
    )
}

export default Post;