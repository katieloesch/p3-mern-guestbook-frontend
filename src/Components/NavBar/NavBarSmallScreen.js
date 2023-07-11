// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { getToAccountPage } from '../Users/api';

// export default function NavBarSmallScreen(props) {
//   const navigate = useNavigate();

//   function logUserOut() {
//     localStorage.removeItem("divorceJWT")
//     props.setTokenInLocalStorage(false)
//     navigate('/users/logout')
//     props.showMenu()
//   }

//   async function gotToAccount() {
//     let token = JSON.parse(localStorage.getItem('divorceJWT')) 

//     if (token) {
//       const id = token.id  
//       let response = await getToAccountPage(id, token)
   
//   if (response.status === 200) {
//     navigate(`/users/${id}/account`)
//     props.showMenu()
      
//   } } else {
//     navigate('/users/login')
//     props.showMenu()
//   }
//   }
 
//   return (
//     <>
//     <ul className={props.hamburger ? '' : 'hidden'}>
//         <li className=''>{props.close}</li>
//         <li onClick={props.showMenu} className=''><Link to='/posts'>Posts</Link></li>
//         <li onClick={props.showMenu} className=''><Link to='/users'>Users</Link></li>
//         <li className='' onClick={gotToAccount}>Account</li>
//         {!props.tokenInLocalStorage && <li className='' onClick={props.showMenu}><Link to='/users/create'>Sign Up</Link></li>}
//         {!props.tokenInLocalStorage && <li className='' onClick={props.showMenu}><Link to='/users/login'>Log In</Link></li>}
//         {props.tokenInLocalStorage && <li className='' onClick={logUserOut}>Log Out</li>}
//     </ul>
//     <br />
//     </>
//   )
// }
