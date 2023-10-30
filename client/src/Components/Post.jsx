import React from "react";

function Post(){
    return (

        <div className="post mt-5">
            <img src={require("../images/post2.jpg")} alt="post-title" className="img-fluid mx-auto d-block my-4"/>
            <div className="content">
                <h2 className="my-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, debitis?</h2>
                <p className="summary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus ad, perferendis laborum consequatur nemo, adipisci non at, eligendi quaerat libero minima! Totam nemo placeat debitis numquam iusto nesciunt porro, facere quae laudantium. Non dolorem fuga quisquam, provident amet, dicta similique corrupti veniam ratione eaque quod ipsam obcaecati. Numquam, esse voluptatem.</p>
                <div className="author-info me-sm-5">
                    By, 
                    <a href="#">Lakshya Gupta</a>
                    <time>2023-01-06 16:45</time>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Post;