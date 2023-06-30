import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import NavBarSmallScreen from '../NavBar/NavBarSmallScreen'
import './Header.scss'

export default function Header(props) {

    const [hamburger, setHamburger] = useState(false)

    function showMenu() {
        setHamburger(!hamburger)
    }

    const icons = {
        hamburger: (<svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" width="1.9em" height="1.9em" viewBox="0 0 16 16">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/>
                    </svg>),
        close: (<svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m7 7l10 10M7 17L17 7"/>
                </svg>)
    }

  return (
    <div className='header'>
        <h1>Divorce Party Guest Book</h1>
        <NavBar tokenInLocalStorage={props.tokenInLocalStorage} setTokenInLocalStorage={props.setTokenInLocalStorage}/>
        <div className='hamburger'> 
            {icons.hamburger}
        </div>
        <NavBarSmallScreen showMenu={showMenu} hamburger={hamburger} close={icons.close} tokenInLocalStorage={props.tokenInLocalStorage} setTokenInLocalStorage={props.setTokenInLocalStorage}/>
    </div>
  )
}
