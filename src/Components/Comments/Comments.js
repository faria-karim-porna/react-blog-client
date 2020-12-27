import React from 'react';
import './Comments.css';
const Comment = (props) => {
    return (
        <div>
            <div className = "row w-75 ml-auto mr-auto mt-3 pb-5">
                        <div className = "col-md-2 col-xs-2">
                            <img src = {props.aComment.commentor_image} className = "comment-profile-pic"/>
                        </div>
                        <div className = "col-md-10 col-xs-10 comment-section pl-3 pb-2 pr-3 pt-2">
                                <div>{props.aComment.commentor_name}          |           {props.aComment.commentor_email} </div>
                                <div>{props.aComment.comment}</div>
                        </div>
            </div>
        </div>
    );
};

export default Comment;