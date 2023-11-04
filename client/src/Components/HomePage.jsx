import React, { useContext, useEffect, useState } from "react";

import Post from  "./Post";
import {Container} from "react-bootstrap";
import {Fab} from "@mui/material"
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";


function HomePage(){

    const {userInfo} = useContext(UserContext);
    const username = userInfo?.username;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/posts').then(res => {
        res.json().then(posts => {
          // console.log(posts);
          setPosts(posts);
        })
      })
    }, [posts])

    return (
        <>
        <Container className="carousel px-5" fluid="xs">
          <h1>BLOG WEBSITE</h1>
        </Container>
        <main>
          <h2 className="mb-5">Welcome To Our Blog Website</h2>
        {/* <Post />
        <Post /> */}

        {posts.length > 0 && posts.map(post => (
          <Post {...post}/>
        ))}

        </main>
        {
            username && (
                <Link to="/create">
                    <Fab color="primary" aria-label="add" className="new-post">
                        {/* <AddIcon /> */}
                        +
                    </Fab>
                </Link>
            )
        }
      </>
    )
}

export default HomePage;