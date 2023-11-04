import React from "react";
import {formatISO9075} from "date-fns";

function Post({title, summary, cover, createdAt, author}){
    // console.log(cover);
    return (

        <div className="post mt-5">
            <img src={'http://localhost:4000/'+cover} alt="post-title" className="img-fluid mx-auto d-block my-4"/>
            <div className="content">
                <h2 className="my-3">{title}</h2>
                <p className="summary">{summary}.</p>
                <div className="author-info me-sm-5">
                    By, 
                    <a href="#">{author.username}</a>
                    <time>{formatISO9075(new Date(createdAt))}</time>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Post;