import { useNavigate, useParams } from 'react-router-dom'
import React from 'react'
import { deleteOneUser, getAllUsers, getToAccountPage } from './api';
import './UserDeleteAccount.scss'

export default function UserDeleteAccount(props) {
    const params = useParams()
    const navigate = useNavigate();

    async function handleDelete() {
        const response = await deleteOneUser(params.id)

        localStorage.removeItem("divorceJWT")
        props.setTokenInLocalStorage(false)
        navigate(`/users/deleteSuccessful`)

        if (response.error) {
            alert('error user could not be deleted')
        } else {
            await getAllUsers()
                .then(results => results.json())
                .then(data => {
                props.setUsers(data)})
        }}

        async function handleCancel() {
            let token = JSON.parse(localStorage.getItem('divorceJWT'))       
            let response = await getToAccountPage(params.id, token)
    
            if (response.status === 401) {
                navigate('/users/login')
            }
            if (response.status === 200) {
                navigate(`/users/${params.id}/account`)
            }
        }

  return (
    <div className='nav-section delete-account-page'>
        <ul>
            <li> <h1 className='delete-account-title'> Are you sure you want to delete your account??</h1></li>
            <li> <button className='btn-delete-account' type="button" onClick={handleDelete}>Yes, delete my account</button></li>
            <li> <button className='btn-delete-account' type="button" onClick={handleCancel}>Cancel</button></li>
        </ul> 
    </div>
  )
}
