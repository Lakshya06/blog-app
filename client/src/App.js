import React, { useState } from "react"

import HomePage from "./Components/HomePage";
import  {Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./Components/CreatePost";
import PostPage from "./Components/PostPage";
import EditPost from "./Components/EditPost";

function App(){
  const [isLogged, setIsLogged] = useState(false);
  return (
    <UserContextProvider>

    <Routes>
      <Route path="/" element={<Layout isLogged={isLogged} setIsLogged={setIsLogged}/>}>

      <Route index element={
        <HomePage />
      } />
      <Route path='/login' element={
        <LoginPage isLogged={isLogged} setIsLogged={setIsLogged}/>
      }
      />
      <Route path='/register' element={
        <RegisterPage isLogged={isLogged} setIsLogged={setIsLogged}/>
      }
      />

      <Route path="/create" element={
        <CreatePost />
      } />

      <Route path="/posts/:id" element={
        <PostPage />
      } />

      <Route path="/edit/:id" element={
        <EditPost />
      }/>

      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App;