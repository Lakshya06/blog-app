import React from "react"

import HomePage from "./Components/HomePage";
import  {Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import LoginPage from "./Components/LoginPage";

function App(){

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

      <Route index element={
        <HomePage />
      } />
      <Route path='/login' element={
        <LoginPage />
      }
      />

      </Route>
    </Routes>
  )
}

export default App;