import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneUser } from './api'
import './ShowUser.scss'


export default function ShowUser() {
    const params = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)})
    }, [params.id])


    let display;
   
    if (user.posts) {
      display = user.posts.map((post) => {
        return(
                <div className="post">
                  <div className="post-container">
                    <h3 className="">{post.title}</h3>
                    <p className="">{post.content}</p>
                  </div>
                </div>)
              
    })

    } else {
      display = <p>Loading...</p>
    }
    

  return (
    <div className='show-user nav-section'>
        <h2 className='show-user-name'>{user.name}</h2>
        <h3 className='show-user-username'>{user.username}</h3>
        <div className='show-user-posts-section'>
            <Link to={`/users/${params.id}/posts`}><h3 className='show-user-posts-title'>Posts:</h3></Link>
            <div className="show-user-posts">{display}</div>
        </div>
    </div>
  )
}
