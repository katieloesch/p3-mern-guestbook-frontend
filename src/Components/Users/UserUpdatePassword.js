import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers, getOneUser, getToAccountPage, updateOneUser } from './api';

import './UserUpdatePassword.scss'

export default function UserUpdatePassword(props) {
  const bcrypt = require('bcryptjs');
  const navigate = useNavigate();
  const params = useParams()
  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({
    old: '',
    new1: '',
    new2: ''
  })

  useEffect(() => {

      getOneUser(params.id)
      .then(results => results.json())
      .then(data => {
          setUser(data)
        })

  }, [params.id])

  function handleFormChange(e) {
      const newInput = {...formData, [e.target.name]: e.target.value}
      setFormData(newInput)
  }

  async function handleCancel() {

    let token = JSON.parse(localStorage.getItem('divorceJWT'))       
    let response = await getToAccountPage(params.id, token)
    
    if (response.status === 401) {
        navigate('/users/login')
    }
    if (response.status === 200) {
        navigate(`/users/${params.id}/account`)
    }}

  async function handleFormSubmit(e) {
    e.preventDefault()

    if (formData.new1 !== formData.new2) {
        alert("New password entries don't match!")
    } else {
        
        if (bcrypt.compareSync(formData.old, user.password)) {
            const salt = bcrypt.genSaltSync(10)
            const hashedNewPw = bcrypt.hashSync(formData.new1, salt)
            let updatedUser = {...user}
            updatedUser.password = hashedNewPw
            await updateOneUser(updatedUser, params.id)

            if (updatedUser.error) {
                  alert("Server Error, password could not be updated!")
            } else {

                await getAllUsers()
                .then(results => results.json())
                .then(data => {
                    props.setUsers(data)})
                    let token = JSON.parse(localStorage.getItem('divorceJWT'))       
                    let response = await getToAccountPage(params.id, token)

                if (response.status === 401) {
                      navigate('/users/login')
                } 
                
                if (response.status === 200) {
                      navigate('/users/:id/account/update/password/success')
                  }
            }
        } else {
            alert("Old Password doesn't match record in database!")
        }
    }
  }
    return (
      <div className='nav-section update-password-page'>
    
          <form onSubmit={handleFormSubmit}>
              <h1 className='update-password-title'>Change Your Password</h1>
              <ul>
                  <li><h3>Old Password</h3></li>
                  <li><input type='password' value={formData.old} name='old' required onChange={handleFormChange}></input></li>
                  <li><h3>New Password</h3></li>
                  <li><input type='password' value={formData.new1} name='new1' required onChange={handleFormChange}></input></li>
                  <li><h3>Confirm New Password</h3></li>
                  <li><input type='password' value={formData.new2} name='new2' required onChange={handleFormChange}></input></li>
                  <li className='btns-update-password'><button type="button" onClick={handleCancel}>Cancel</button><button type="submit">Submit</button></li>
              </ul> 
          </form>
      </div>
    )
  }
    