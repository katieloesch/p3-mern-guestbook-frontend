import React from 'react'
import { useState } from 'react';
import { findOnLogIn } from './api';
import { Link, useNavigate } from "react-router-dom";
import './UserLogin.scss'

export default function UserLogin(props) {
  const navigate = useNavigate();

  const template = {
    username: '',
    password: '',
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

  const userData = await findOnLogIn(formData)

  if (userData.error) {
    alert("Invalid username or password, couldn't log in!")
  } else {
    const user = userData.user
    const id = user[0]._id
    const token = {
      token: userData.token,
      id: id
    }

    localStorage.setItem("divorceJWT", JSON.stringify(token))
    props.setTokenInLocalStorage(true)
    setFormData(template)
    navigate(`/users/${id}/account`)
  }
}


  return (
    <div className='login nav-section'>
        <form onSubmit={handleFormSubmit}>
            <h1>Log In</h1>
            <ul>
                <li><input name='username' required onChange={handleFormChange} placeholder='username'></input></li>
                <li><input name='password' required type='password' onChange={handleFormChange} placeholder='password'></input></li>
                <li className='btns-login'><button type="submit">Log In</button><button type="button" onClick={handleCancel}>Cancel</button></li>
                <li className='btn-redirect-signup'><span>Don't have an account? </span><Link to='/users/create'> Sign Up </Link> </li>
            </ul> 
        </form>
    </div>
  )
}