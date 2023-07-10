import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CreatePostForm.scss'
import { createNewUserPost, getOneUser } from './api'

const CreatePostForm = () => {
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        })
    }, [params.id])

  

    const template = {
        title: '',
        content: '',
        author: ''
    }
    const [formData, setFormData] = useState(template)
    const [user, setUser] = useState({})

    function handleFormChange(e) {
        const newInput = {...formData, [e.target.name]: e.target.value}
        setFormData(newInput)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        formData.author = user.name
        await createNewUserPost(params.id, formData)

        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        
        })
        setFormData({title: '',
        content: '', author: ''})
        navigate(`/users/${params.id}/account`)
    }

  return (
    <div className='new-post-page nav-section'>
        <form onSubmit={handleFormSubmit}>
        <h1 className='add-new-post-heading'>Add New Post</h1>
            <ul>
                <li><h3>Title</h3></li>
                <li> <input name="title" onChange={handleFormChange}></input></li>
                <li><h3>Content</h3></li>
                <li><textarea
                    name="content"
                    onChange={handleFormChange}
                    required
                ></textarea></li>
                <li className='btns-add-new-post'>
                    <button type="button" onClick={(e) => navigate(`/users/${params.id}/account`)}>Cancel</button>
                    <button type="submit">Save New Post</button>
                </li>
            </ul>
        </form>
    </div>
  )
}

export default CreatePostForm
