import React from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './Post.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const Post = (props) => {
    const email = localStorage.getItem("email");
    const [votes, setVotes] = useState([]);
    const [upColor, setUpColor] = useState("");
    let body = props.post.body;
    body = body.slice(0,200);
    //count likes and dislike
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [allComments,setAllComments] = useState([]);
    //
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vote-detail-by-post-up/${props.post.id}`)
        .then(res => res.json())
        .then(data => {
            setLikes(data);
            console.log("Likes count", data)
            
        })
    }, [likes])
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vote-detail-by-post-down/${props.post.id}`)
        .then(res => res.json())
        .then(data => {
            setDislikes(data);
            // setUpColor(data[0].down_vote_color);
            
        })
    }, [dislikes])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/comment-detail-by-post/${props.post.id}`)
        .then(res => res.json())
        .then(data => {
            setAllComments(data);
        })
    }, [])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vote-detail-by-post-and-email/${props.post.id}/${email}`)
        .then(res => res.json())
        .then(data => {
            setVotes(data);
            // setUpColor(data[0].down_vote_color);
            
        })
    }, [votes])
    console.log(votes);
    const handleUpClick = () => {
        if(!votes.length)
        {
            console.log("Up liked create")
            const upVote = true;
            const downVote = false;
            const upColor = "primary";
            const downColor = "dark";
            const createVote = {
                post_id: props.post.id,
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
                post_id: props.post.id,
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
         });

         fetch('http://127.0.0.1:8000/api/vote-create/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateVote)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
            }
            if(votes[0] && !votes[0].up_vote)
            {
                console.log("like the button")
                const upVote = true;
                const downVote = false;
                const upColor = "primary";
                const downColor = "dark";
                const updateVote = {
                    post_id: props.post.id,
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

    //down click
    const handleDownClick = () => {
        if(!votes.length)
        {
            const upVote = false;
            const downVote = true;
            const upColor = "dark";
            const downColor = "primary";
            const createVote = {
                post_id: props.post.id,
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
                post_id: props.post.id,
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
                    post_id: props.post.id,
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
    return (
        <div>
            <div className = "post">
                <div className = "d-flex justify-content-center">
                    <img src = {props.post.author_image} className = "post-profile-pic"/>
                </div>
                <div className = "d-flex justify-content-center w-100">
                    <div className = "main-post w-75 post-body pt-5">
                        <div className = "post-author text-center">{props.post.author_name}          |           {props.post.author_email} </div>
                        <div className = "post-date text-center">Date Posted: {props.post.post_date} </div>
                        <div className = "d-flex justify-content-center w-100 pt-2 pb-2">
                            <div className = "post-line w-75"></div>
                        </div>
                        <div className = "post-title text-center">{props.post.title}  <span className = "post-category pl-2 pr-2">{props.post.category} </span></div>
                        <div className = "d-flex justify-content-center w-100 pt-2 pb-2">
                            <div className = "post-line w-75"></div>
                        </div>
                        <div className = "post-description pl-5 pr-5 mb-5">{body}... </div>
                        <div className = "row w-75 mr-auto ml-auto">
                            <div className = "col-md-6 col-xs-6"><span className = "mr-1">({likes && likes.length})votes</span>({dislikes.length})votes
                            </div>
                            <div className = "col-md-6 col-xs-6 d-flex justify-content-end post-button-section">
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
                            <div className = "col-md-8 col-xs-8 d-flex justify-content-end post-button-section">
                                <Link to = {`detailPost/${props.post.id}`} className = "link"><p className = "post-detail-button pl-1 pr-1 pb-1 pt-1">Read More ....</p></Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
        </div>
    );
};

export default Post;