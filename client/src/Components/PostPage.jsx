import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { BASE_URL } from "../helper";

function PostPage(){

    const {userInfo} = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        // console.log(id);
        fetch(`${BASE_URL}/posts/${id}`).then(res => {
            res.json().then(postInfo => {
                setPostInfo(postInfo);
                // console.log(postInfo);
            })
        })
    }, [])

    
    const [redirect, setRedirect] = useState(false);

    function deletePost(){


        // console.log(userInfo.id);

        fetch(`${BASE_URL}/posts/${id}`, {
            method: 'DELETE',
            body: userInfo,
            credentials: 'include',
        }).then(res => {
                if(res.ok){
                    setRedirect(true);
                    // console.log("Home page")
                }
        })
        ;

        // res.json();

        // if(res.ok){
        //     console.log("home page")
        //     setRedirect(true);
        // }
        // else{
        //     console.log(res);
        // }
    }

    if(!postInfo) return ' ';

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <>
        <Container className="carousel px-5 mb-5" fluid="xs">
            <h1>{postInfo.title}</h1>
        </Container>

        <main>
        <Container className="single-post">

<Row>

    <Col>
    <img src={`${BASE_URL}/${postInfo.cover}`} className="img-fluid my-4" alt="post-cover"/>
    </Col>

    {/* <Col> */}
        <h1 className="my-3">{postInfo.title}</h1>
        
    {/* </Col> */}

        <div className="user-details mb-3">
             By,<a href="#">{postInfo.author.username}</a>
             <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        </div>

        {/* {postInfo.author._id} */}

        {userInfo.id === postInfo.author._id && (

            <div className="edit-post mb-3">
                <Link to={`/edit/${postInfo._id}`}>Edit Post</Link>
                <a href="#" onClick={deletePost}>Delete Post</a>
            </div>
        )}


    <h4 className="mb-4">{postInfo.summary}</h4>

    <div dangerouslySetInnerHTML={{__html:postInfo.content}} className="mt-4 post-content"/>
</Row>

</Container>
        </main>
        </>
    );
}

export default PostPage;