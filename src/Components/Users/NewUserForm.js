import React from 'react'
import { useState } from 'react';
import { createNewUser, findOnLogIn, getAllUsers } from './api';
import { Link, useNavigate } from "react-router-dom";
import './NewUserForm.scss'

export default function NewUserForm(props) {
  const navigate = useNavigate();

  const template = {
    username: '',
    name: '',
    password: '',
    posts: []
  }

const [formData, setFormData] = useState(template)

function handleFormChange(e) {
    const newInput = {...formData, [e.target.name]: e.target.value}
    setFormData(newInput)
}

function handleCancel() {
     navigate("/");
}

async function handleFormSubmit(e) {
  e.preventDefault()
  const newUser = await createNewUser(formData)

  if (newUser.error == "username already exists") {
    alert("The username you entered already exists, please choose a different username!")
  } else {
    await getAllUsers()
    .then(results => results.json())
    .then(data => {
        props.setUsers(data)})
  
  const userData = await findOnLogIn(formData)  
  const user = userData.user
  const id = user[0]._id
  const token = {
    token: userData.token,
    id: id
  }

  localStorage.setItem("divorceJWT", JSON.stringify(token))
  props.setTokenInLocalStorage(true)

  if (userData.error) {
    alert("Server error, couldn't log in!")
  } else {
    setFormData(template)
    navigate(`/users/${id}/account`)
    setFormData(template)
    }
  }
}

  return (
    <div className='nav-section signup'>
        <form onSubmit={handleFormSubmit}>
            <h1>Sign Up</h1>
            <ul>
                <li key="username-input"><input name='username' required placeholder='username' onChange={handleFormChange}></input></li>
                <li key="name-input"><input name='name' required placeholder='display name' onChange={handleFormChange}></input></li>
                <li key="password-input"><input name='password' required type='password' placeholder='password' onChange={handleFormChange}></input></li>
                <li ley="btns-signup" className='btns-signup'><button type="button" onClick={handleCancel}>Cancel</button><button type="submit">Submit</button></li>
                <li key="btn-redirect-login" className='btn-redirect-login'><span>Already have an account?</span><Link to='/users/login'> Log In </Link></li>
            </ul> 
        </form>
    </div>
  )
}