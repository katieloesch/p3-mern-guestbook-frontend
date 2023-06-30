import React from "react";
import './Post.scss'

//Defines the Layout of the Post

export default function Post(props) {
  return (
    <div className="post">
      <div className="post-container">
        <h3>{props.title}</h3>
        <p>{props.content}</p>
        <p>by: {props.author}</p>
      </div>
    </div>
  );
}
