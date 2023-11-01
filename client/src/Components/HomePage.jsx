import React, { useContext } from "react";

import Post from  "./Post";
import {Container} from "react-bootstrap";
import {Fab} from "@mui/material"
import { UserContext } from "../UserContext";


function HomePage(){

    const {userInfo} = useContext(UserContext);
    const username = userInfo?.username;
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
        {
            username && (

            <Fab color="primary" aria-label="add" className="new-post">
                {/* <AddIcon /> */}
                +
            </Fab>
            )
        }
      </>
    )
}

export default HomePage;