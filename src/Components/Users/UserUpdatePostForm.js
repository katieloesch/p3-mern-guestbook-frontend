import React, { useEffect, useState } from 'react'
import { getOneUser, updateOneUserPost } from './api'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneUserPost } from './api';
import './UserUpdatePostForm.scss'

export default function UserUpdatePostForm() {
    const navigate = useNavigate();
    const params = useParams()

    const [post, setPost] = useState({})
    const [updateFormData, setUpdateFormData] = useState({})

    useEffect(
        () => {
        getOneUserPost(params.id,params.postId)
        .then(results => results.json())
        .then(data => {
            setPost(data)
            setUpdateFormData({title: data.title, content: data.content, author: data.author})
        })
    }, [params.id, params.postId])
    
    function handleUpdateFormChange(e) {
        const newInput = {...updateFormData, [e.target.name]: e.target.value}
        setUpdateFormData(newInput)
    }

    async function handleUpdatePost (e) {
        e.preventDefault()
        await updateOneUserPost(params.id, params.postId, updateFormData)
        navigate(`/users/${params.id}/account`)
    }

  return (
    <div className='nav-section edit-post-page'>
        
        <form onSubmit={(e) => handleUpdatePost(e)}>
        <h1 className='edit-post-heading'>Edit Post</h1>
            <ul>
                <li><h3>Title</h3></li>
                <li>
                    <input
                        name="title"
                        onChange={handleUpdateFormChange}
                        value={updateFormData.title}
                    ></input>
               </li>
                
                <li><h3>Content</h3></li>
                <li>
                    <textarea
                    name="content"
                    onChange={handleUpdateFormChange}
                    value={updateFormData.content}
                    required
                    ></textarea>
                </li>
        
                <li className='btns-edit-post'><button type="button" onClick={() => navigate(`/users/${params.id}/account`)}>Cancel</button><button type="submit">Save Changes</button></li>
            </ul>
        </form>
    </div>
  )
}
