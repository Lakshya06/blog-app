import React from "react";

function Header(){
    return (
        <header className="">
            <a href="#" className="logo"><img src={require("../images/logo.png")} alt="logo" className="mx-2"/>BLOG</a>
            <nav>
                <a href="#">Login</a>
                <a href="#">Register</a>
            </nav>
            {/* <h1>hji</h1> */}
        </header>
        // <h1>header</h1>
    )
}

export default Header