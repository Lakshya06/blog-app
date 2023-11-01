import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header(props){
    // const [username, setUsername] = useState(null);
    const {userInfo, setUserInfo} = useContext(UserContext);
    useEffect(() => {
        console.log("Logged In");
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(res => {
            res.json().then(userInfo => {
                // setUsername(userInfo.username);
                setUserInfo(userInfo);
            });
        });
    },[]);
    function logout(){
        console.log("Logged Out")
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
        })
        props.setIsLogged(false);
        // setUsername(null);
        setUserInfo(null);
    }
    const username = userInfo?.username;
    return (
        <header className="">
            <Link to="/" className="logo"><img src={require("../images/logo.png")} alt="logo" className="mx-2"/>BLOG</Link>
            <nav>
                {(username &&  props.isLogged) && (
                    <>
                    <p className="mb-0 pt-2">Welcome, <span style={{color: "rgb(196, 0, 0)"}}>{username}</span></p>
                    <Link onClick={logout}>Logout</Link>
                    </>
                )}
                {!(username && props.isLogged )&& (
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