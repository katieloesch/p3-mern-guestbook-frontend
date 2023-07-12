import React, { useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToAccountPage } from '../Users/api';
import './NavBar.scss'
import { navItems } from './NavItems';
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

export default function NavBar(props) {
  const navigate = useNavigate();
  const [menuToggle, setMenuToggle] = useState(false)

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
    setMenuToggle(false)

  }

  function logUserOut() {
    localStorage.removeItem("divorceJWT")
    props.setTokenInLocalStorage(false)
    setMenuToggle(false)

    navigate('/users/logout')
  }

  return (<div className='nav-bar'>
            <ul className='nav-list'>
            {navItems.map((item, index) => {
              if (item.display === 'always') {
                return <li key={`nav-item-${index}`} className='nav-item'><Link to={item.link}>{item.name}</Link></li>
              } else if (!props.tokenInLocalStorage&&item.display === 'userLoggedOut') {
                return <li key={`nav-item-${index}`} className='nav-item'><Link to={item.link}>{item.name}</Link></li>
              } else if (props.tokenInLocalStorage&&item.name === 'Account') {
                return <li  key={`nav-item-${index}`} className='nav-item' onClick={gotToAccount}><Link>{item.name}</Link></li>
              } else if (props.tokenInLocalStorage&&item.name === 'Log Out') {
                return <li key={`nav-item-${index}`} className='nav-item' onClick={logUserOut}><Link>{item.name}</Link></li>
              } else {
                return null
              }
            })}
            </ul>
            <div className='hamburger-container'>
              <div className='hamburger'>
              <HiMenuAlt4 onClick={() => (setMenuToggle(true))}/>
              {menuToggle && (
                  <motion.div
                      whileInView = {{x: [300, 0]}}
                      transition={{ duration: 0.85, ease: 'easeOut' }}
                      className='mobile-menu'
                  >
                      <HiX onClick={() => setMenuToggle(false)} />
                      <ul className='mobile-nav-list'>
                      {navItems.map((item, index) => {
                        if (item.display === 'always') {
                          return <li key={`mobile-nav-item-${index}`} className='mobile-nav-item' onClick={() => setMenuToggle(false)} ><Link to={item.link}>{item.name}</Link></li>
                        } else if (!props.tokenInLocalStorage&&item.display === 'userLoggedOut') {
                          return <li key={`mobile-nav-${index}`} className='mobile-nav-item' onClick={() => setMenuToggle(false)} ><Link to={item.link}>{item.name}</Link></li>
                        } else if (props.tokenInLocalStorage&&item.name === 'Account') {
                          return <li  key={`mobile-nav-item-${index}`} className='mobile-nav-item' onClick={gotToAccount}><Link>{item.name}</Link></li>
                        } else if (props.tokenInLocalStorage&&item.name === 'Log Out') {
                          return <li key={`mobile-nav-item-${index}`} className='mobile-nav-item' onClick={logUserOut}><Link>{item.name}</Link></li>
                        } else {
                          return null
                        }
                      })}
                      </ul>
                    </motion.div>)}
              </div>
            </div>
        </div>)
}
