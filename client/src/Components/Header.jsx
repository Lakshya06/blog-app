import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header(){
    const [username, setUsername] = useState(null);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(res => {
            res.json().then(userInfo => {
                setUsername(userInfo.username);
            })
        })
    }, [])
    return (
        <header className="">
            <Link to="/" className="logo"><img src={require("../images/logo.png")} alt="logo" className="mx-2"/>BLOG</Link>
            <nav>
                {username &&  (
                    <>
                    <p className="mb-0 pt-2">Welcome, <span style={{color: "rgb(196, 0, 0)"}}>{username}</span></p>
                    <Link>Logout</Link>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
            {/* <h1>hji</h1> */}
        </header>
        // <h1>header</h1>
    )
}

export default Header