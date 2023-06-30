import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { getAllPosts } from "./Postapi";

import './Posts.scss';

export default function Posts(props) {


  useEffect(() => {
    getAllPosts()
      .then((data) => data.json())
      .then((newPosts) => props.setPosts(newPosts));
  }, []);

  let allPosts = <h3>Loading...</h3>;


  if (props.posts.posts) {
  }
  if (props.posts.posts) {
    if (props.posts.posts.length > 0) {
      allPosts = props.posts.posts.map((post, index) => {
        return (
            <Post
              id={post._id}
              idUpdate={post._id}
              author={post.author}
              title={post.title}
              content={post.content}
              posts={props.posts}
              setPosts={props.setPosts}
              key={props.index}
            />
          
        );
      });
    }
  }

  return (
    
    <div className="posts">
   
      <div className="posts-container">
        <h1 className="font-bold text-2xl pb-4 ">Posts</h1>
        {allPosts}
      </div>

    </div>
  );
}
