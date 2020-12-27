import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import './Blog.css';
import Navbar from '../Navbar/Navbar';
const Blog = () => {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/post-list/')
        .then(res => res.json())
        .then(data => {
            setPosts(data);
        })
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <div className = "container">
            {
               posts.map(post =><Post post = {post}></Post>)
            } 
            </div>
        </div>
    );
};

export default Blog;