import React from 'react';
import './DetailPost.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Comments from '../Comments/Comments';
import Navbar from '../Navbar/Navbar';
const DetailPost = () => {
    const {postId} = useParams();
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const photo = localStorage.getItem("photo");
    const[posts, setPosts] = useState([]);
    const[allComments, setAllComments] = useState([]);
    const [comment, setComment] = useState("");
    const [date, setDate] = useState("");
    const [votes, setVotes] = useState([]);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vote-detail-by-post-up/${postId}`)
        .then(res => res.json())
        .then(data => {
            setLikes(data);
            console.log("likes", data);
            // setUpColor(data[0].down_vote_color);
            
        })
    }, [likes]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vote-detail-by-post-down/${postId}`)
        .then(res => res.json())
        .then(data => {
            setDislikes(data);
            // setUpColor(data[0].down_vote_color);
            
        })
    }, [dislikes]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/post-detail/${postId}`)
        .then(res => res.json())
        .then(data => {
            setPosts(data);
        })
    }, [])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/comment-detail-by-post/${postId}`)
        .then(res => res.json())
        .then(data => {
            setAllComments(data);
        })
    }, [allComments])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vote-detail-by-post-and-email/${postId}/${email}`)
        .then(res => res.json())
        .then(data => {
            setVotes(data);
            // setUpColor(data[0].down_vote_color);
            
        })
    }, [votes]);
    const handleUpClick = () => {
        if(!votes.length)
        {
            console.log("Up liked create")
            const upVote = true;
            const downVote = false;
            const upColor = "primary";
            const downColor = "dark";
            const createVote = {
                post_id: postId,
                voter_email: email,
                up_vote: upVote,
                down_vote: downVote,
                up_vote_color: upColor,
                down_vote_color: downColor,
            }
            console.log(createVote);
            fetch('http://127.0.0.1:8000/api/vote-create/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createVote)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        }
        if(votes[0] && votes[0].up_vote)
        {
            console.log("unlike the button")
            const upVote = false;
            const downVote = false;
            const upColor = "dark";
            const downColor = "dark";
            const updateVote = {
                post_id: postId,
                voter_email: email,
                up_vote: upVote,
                down_vote: downVote,
                up_vote_color: upColor,
                down_vote_color: downColor,
            }
            fetch(`http://127.0.0.1:8000/api/vote-delete/${votes[0].id}`, {
             method: 'DELETE'
         })
         .then(res => res.json())
         .then(result => {
             console.log('deleted')
         })

         fetch('http://127.0.0.1:8000/api/vote-create/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateVote)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
            }
            if(votes[0] && !votes[0].up_vote)
            {
                console.log("like the button")
                const upVote = true;
                const downVote = false;
                const upColor = "primary";
                const downColor = "dark";
                const updateVote = {
                    post_id: postId,
                    voter_email: email,
                    up_vote: upVote,
                    down_vote: downVote,
                    up_vote_color: upColor,
                    down_vote_color: downColor,
                }
                fetch(`http://127.0.0.1:8000/api/vote-delete/${votes[0].id}`, {
                 method: 'DELETE'
             })
             .then(res => res.json())
             .then(result => {
                 console.log('deleted')
             })
    
             fetch('http://127.0.0.1:8000/api/vote-create/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updateVote)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
                }

    }
    const handleBlur = (e) => {
        if (e.target.name == "comment")
        {
            setComment(e.target.value);
        }
    }

    const handleDownClick = () => {
        if(!votes.length)
        {
            const upVote = false;
            const downVote = true;
            const upColor = "dark";
            const downColor = "primary";
            const createVote = {
                post_id: postId,
                voter_email: email,
                up_vote: upVote,
                down_vote: downVote,
                up_vote_color: upColor,
                down_vote_color: downColor,
            }
            console.log(createVote);
            fetch('http://127.0.0.1:8000/api/vote-create/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createVote)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        }
        if(votes[0] && votes[0].down_vote)
        {
            console.log("unlike the button")
            const upVote = false;
            const downVote = false;
            const upColor = "dark";
            const downColor = "dark";
            const updateVote = {
                post_id: postId,
                voter_email: email,
                up_vote: upVote,
                down_vote: downVote,
                up_vote_color: upColor,
                down_vote_color: downColor,
            }
            fetch(`http://127.0.0.1:8000/api/vote-delete/${votes[0].id}`, {
             method: 'DELETE'
         })
         .then(res => res.json())
         .then(result => {
             console.log('deleted')
         })

         fetch('http://127.0.0.1:8000/api/vote-create/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateVote)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
            }
            if(votes[0] && !votes[0].down_vote)
            {
                console.log("like the button")
                const upVote = false;
                const downVote = true;
                const upColor = "dark";
                const downColor = "primary";
                const updateVote = {
                    post_id: postId,
                    voter_email: email,
                    up_vote: upVote,
                    down_vote: downVote,
                    up_vote_color: upColor,
                    down_vote_color: downColor,
                }
                fetch(`http://127.0.0.1:8000/api/vote-delete/${votes[0].id}`, {
                 method: 'DELETE'
             })
             .then(res => res.json())
             .then(result => {
                 console.log('deleted')
             })
    
             fetch('http://127.0.0.1:8000/api/vote-create/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updateVote)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    }

    const handleSubmit = () => {
        const newDate = new Date();
        setDate(newDate);
        const createComment = {
            post_id: postId,
            comment: comment,
            commentor_name: name,
            commentor_email: email,
            commentor_image: photo,
            comment_date: date,
        }
        fetch('http://127.0.0.1:8000/api/comment-create/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(createComment)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })


        //votes

        
        
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className = "container">
                <div className = "detail-post pt-4">
                    <div className = "row w-75 mr-auto ml-auto">
                        <div className = "col-md-2">
                            <img src = {posts.author_image} className = "detail-post-profile-pic"/>
                        </div>
                        <div className = "col-md-1">
                            <div className = "seperator"></div>
                        </div>
                        <div className = "col-md-9 detail-post-info d-flex align-items-center">
                            <div>Author Name: {posts.author_name}<br/>Author Email: {posts.author_email}</div>
                        </div>
                    </div>

                    <div className = "d-flex justify-content-center w-100 pt-3 pb-3">
                            <div className = "detail-post-line w-75"></div>
                    </div>

                    <div className = "w-75 mr-auto ml-auto"><div className = "text-center w-100">{posts.title}</div></div>

                    <div className = "d-flex justify-content-center w-100 pt-3 pb-3">
                            <div className = "detail-post-line w-75"></div>
                    </div>

                    <div className = "w-75 mr-auto ml-auto mb-5"><div className = "w-100">{posts.body}</div></div>

                    <div className = "row w-75 mr-auto ml-auto">
                            <div className = "col-md-6 col-xs-6"><span className = "mr-1">{likes && likes.length}votes</span>({dislikes.length})votes
                            </div>
                            <div className = "col-md-6 col-xs-6 d-flex justify-content-end">
                                Comments({allComments.length})
                            </div>
                    </div>

                    <div className = "d-flex justify-content-center w-100 pt-2 pb-2">
                            <div className = "post-line w-75"></div>
                    </div>

                    <div className = "row w-75 mr-auto ml-auto">
                            <div className = "col-md-4 col-xs-4">
                                        <ThumbUpAltIcon className = "mr-3" onClick = {handleUpClick} color = {votes[0] && votes[0].up_vote_color || "dark"}></ThumbUpAltIcon>
                                        <ThumbDownAltIcon onClick = {handleDownClick} color = {votes[0] && votes[0].down_vote_color || ""}></ThumbDownAltIcon>
                            </div>
                    </div>

                    {/* create comment */}
                    <div className = "row w-75 ml-auto mr-auto mt-3 pb-5">
                        <div className = "col-md-2 col-xs-2">
                            <img src = {photo} className = "comment-profile-pic"/>
                        </div>
                        <div className = "col-md-10 col-xs-10">
                            <form onSubmit = {handleSubmit}>
                                <div className = "row">
                                    <div className = "col-md-10 col-xs-10">
                                        <textarea className = "comment-textArea-add" name = "comment" placeholder = "Write a comment ..." onBlur = {handleBlur}></textarea>
                                    </div>
                                    <div className = "col-md-2 col-xs-2">
                                        <button className = "btn-custom" type="submit">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* end create comment */}
                    {
                            allComments.map(aComment =><Comments aComment = {aComment}></Comments>)
                    }
                </div>
            </div>
        </div>
    );
};

export default DetailPost;