import React from 'react';
import { useState } from 'react';
import './CreatePost.css';
import Navbar from '../Navbar/Navbar';
const CreatePost = () => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const photo = localStorage.getItem("photo");
    const [date, setDate] = useState("");
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const handleBlur = (e) => {
        if (e.target.name == "blogTitle")
        {
            setTitle(e.target.value);
        }
        if (e.target.name == "blogCategory")
        {
            setCategory(e.target.value);
        }
        if (e.target.name == "blogBody")
        {
            setBody(e.target.value);
        }
    }

    const handleSubmit = () => {
        const newDate = new Date();
        setDate(newDate);
        const createBlog = {
            title: title,
            category: category,
            body: body,
            author_name: name,
            author_email: email,
            author_image: photo,
            post_date: date,
        }
        fetch('http://127.0.0.1:8000/api/post-create/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createBlog)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className = "container">
                <div className = "post-form pt-4">
                    <p className = "text-center form-name mb-2 mt-2">Create A Blog</p>
                    <div className = "row w-75 mr-auto ml-auto">
                        <div className = "col-md-2">
                            <img src = {photo} className = "create-post-profile-pic"/>
                        </div>
                        <div className = "col-md-1">
                            <div className = "seperator"></div>
                        </div>
                        <div className = "col-md-9 create-post-info d-flex align-items-center">
                            <div>{name}<br/>{email}</div>
                        </div>
                    </div>

                    <div className = "d-flex justify-content-center w-100 pt-3 pb-3">
                            <div className = "create-post-line w-75"></div>
                    </div>

                    <div className = "mt-3">
                        <form className = "main-blog-form pb-3 w-75 mr-auto ml-auto" onSubmit = {handleSubmit}>
                        <p className = "form-label">Write Title</p>
                        <input type = "text" placeholder="Write the title of the blog" name = "blogTitle" className = "input-add" onBlur = {handleBlur} />
                        <p className = "form-label pt-2">Write Category</p>
                        <input type = "text" placeholder="Write the category/tag of the blog" name = "blogCategory" className = "input-add" onBlur = {handleBlur}/>
                        <p className = "form-label pt-2">Write The Blog</p>
                        <textarea className = "textArea-add" name = "blogBody" placeholder = "Write the blog" onBlur = {handleBlur}></textarea>
                        <div className = "d-flex justify-content-center submit-btn "> <button className = "btn-custom" type="submit">Create Your Blog</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;