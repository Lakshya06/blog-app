import React from "react";

import Post from  "./Post";
import {Container} from "react-bootstrap";

function HomePage(){
    return (
        <>
        <Container className="carousel px-5" fluid="xs">
          <h1>BLOG WEBSITE</h1>
        </Container>
        <main>
          <h2 className="mb-5">Welcome To Our Blog Website</h2>
        <Post />
        <Post />
        </main>
      </>
    )
}

export default HomePage;