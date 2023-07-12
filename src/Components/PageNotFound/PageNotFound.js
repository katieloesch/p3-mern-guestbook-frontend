import React from 'react'
import './PageNotFound.scss'

export default function PageNotFound() {
  return (
    <div className='page-not-found-page'>
        <h1>404 Page Not Found</h1>
        <img src={require('./../../assets/images/broken_heart.png')}/>
    </div>
  )
}
