import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function Layout(props){
    return (
        <>
            <Header isLogged={props.isLogged} setIsLogged={props.setIsLogged}/>
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;