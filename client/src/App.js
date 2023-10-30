import React from "react"

import Header from "./Components/Header"
import Post from "./Components/Post";
import Footer from "./Components/Footer"
import {Carousel, Container} from "react-bootstrap";

function App(){

  return (
    <>
      <Header />
      {/* <h1>jh</h1> */}
      <Container className="carousel px-5" fluid="xs">
        {/* <img src={require("./images/carousel1.jpg")} alt="title"></img> */}
        <h1>BLOG WEBSITE</h1>
      </Container>
      <main>
        <h2 className="mb-5">Welcome To Our Blog Website</h2>
      <Post />
      <Post />
      </main>
      <Footer />
    </>
  )
}

export default App;