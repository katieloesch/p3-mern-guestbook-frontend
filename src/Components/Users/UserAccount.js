import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createNewUserPost, deleteOneUserPost, getOneUser, getToDeleteAccountPage, getToUpdateAccountPage, getToUpdatePasswordPage } from './api'
import './UserAccount.scss'

export default function UserAccount() {
    const navigate = useNavigate();
    const params = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        })
    }, [params.id])

    async function handleDeleteAccount() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToDeleteAccountPage(params.id, token)
     
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/delete`)
        }
    }

    async function handleUpdateAccount() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToUpdateAccountPage(params.id, token)
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/update`)
        }
    }

    async function handleUpdatePassword() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToUpdatePasswordPage(params.id, token)
   
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/update/password`)
        } 
    }

  




    async function handleDeletePost (e, postId) {        
        await deleteOneUserPost(params.id, postId)
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        })
    }

    let display;
   
    if (user.posts) {
      display = user.posts.map((post) => {
        return <div key={post._id} className='account-posts'>  
                    <div className="post">
                        <div className="post-container">
                            <Link to={`/users/${user._id}/posts/${post._id}`} className='flex flex-col py-5 px-10 text-center items-center' key={post._id}>
                                <h3 className="">{post.title}</h3>
                                <p className="">{post.content}</p>
                            </Link>
                            <div className='btns-post'>
                                <button onClick={(e) => (handleDeletePost(e, post._id))}>Delete Post</button>
                                <button onClick={(e) => navigate(`/users/${params.id}/posts/${post._id}/update`)}>Edit Post</button>
                            </div>
                        </div>
                    </div>
                </div>
    })

    } else {
      display = <p>Loading...</p>
    }
    
  return (
    <div className='nav-section account-page'>
        <h2 className='account-name'>{user.name}</h2>
        <h3 className='account-username'>{user.username}</h3>
        <div className='btns-account'>
            <button onClick={handleDeleteAccount}>delete account</button>
            <button onClick={handleUpdateAccount}>update username / display name</button>
            <button onClick={handleUpdatePassword}>update password</button>
            <button onClick={(e) => navigate(`/users/${params.id}/posts/create`)}>Add new post</button>
        </div>             
        <div className='account-posts-section'>
            <Link to={`/users/${params.id}/posts`}><h2 className='account-posts-title'>Posts:</h2></Link>
      
                {display}
       
            
        </div>
        
    </div>
  )
}