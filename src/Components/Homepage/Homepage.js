import React from 'react'
import './Homepage.scss'

export default function Homepage() {
  return (
    <div className="home">
      <div className='home-img'>
        <img src={require('./../../assets/images/home_bg.jpg')} alt="divorcée celebrating divorce" />
      </div>
    </div>
  )
}
