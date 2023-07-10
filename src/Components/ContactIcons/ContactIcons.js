import React from 'react'
import { BsGithub} from'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'
import { VscMail } from'react-icons/vsc'
import { BiLink } from'react-icons/bi'

import './ContactIcons.scss'

const ContactIcons = () => {
  return (
    <div className='contact-icons'>

        <div className='contact-icon-portfolio contact-icon'>
            <a href="http://katieloesch.co.uk" target="_blank" rel="noopener noreferrer" className='contact-icon-portfolio'><BiLink/></a>
        </div>
    
        <div  className='contact-icon-github contact-icon'>
            <a href="http://github.com/katieloesch" rel="noopener noreferrer" target="_blank"><BsGithub /></a>
        </div>

        <div className='contact-icon-mail contact-icon'>
            <a href="mailto:katie.loesch@pm.me" target="_blank" rel="noopener noreferrer"  className='contact-icon-mail'><VscMail/></a>
        </div>

        <div className='contact-icon-linkedin contact-icon'>
            <a href="https://www.linkedin.com/in/katie-loesch/" target="_blank" rel="noopener noreferrer" ><FaLinkedinIn /></a>
        </div>

</div>

  )
}

export default ContactIcons
