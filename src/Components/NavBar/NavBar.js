import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToAccountPage } from '../Users/api';
import './NavBar.scss'

export default function NavBar(props) {
  const navigate = useNavigate();

  async function gotToAccount() {
    if (props.tokenInLocalStorage) {

      let token = JSON.parse(localStorage.getItem('divorceJWT')) 
      let response = await getToAccountPage(token.id, token)
       
      if (response.status === 200) {
        navigate(`/users/${token.id}/account`)
          
      } else {
        navigate('/users/login')
      }

    } else {
      navigate('/users/login')
    }

  }

  function logUserOut() {
    localStorage.removeItem("divorceJWT")
    props.setTokenInLocalStorage(false)
    navigate('/users/logout')
  }


  return (<div className='nav-bar'>
            <ul className='nav-list'>
                <li className='nav-item'><Link to='/'>Home</Link></li>
                <li className='nav-item'><Link to='/posts'>Posts</Link></li>
                <li className='nav-item'><Link to='/users'>Users</Link></li>
                {props.tokenInLocalStorage && <li className='nav-item' onClick={gotToAccount}>Account</li>}
                {!props.tokenInLocalStorage && <li className='nav-item'><Link to='/users/create'>Sign Up</Link></li>}
                {!props.tokenInLocalStorage && <li className='nav-item'><Link to='/users/login'>Log In</Link></li>}
                {props.tokenInLocalStorage && <li className='nav-item' onClick={logUserOut}>Log Out</li>}

            </ul>
        </div>

        
  )
}
