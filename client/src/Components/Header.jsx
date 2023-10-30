import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return (
        <header className="">
            <Link to="/" className="logo"><img src={require("../images/logo.png")} alt="logo" className="mx-2"/>BLOG</Link>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
            {/* <h1>hji</h1> */}
        </header>
        // <h1>header</h1>
    )
}

export default Header