import React from 'react';
// import Workers from './images/busy-time-workers.png'
import Time from './images/red-alarm.png';
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-body">
        <div>
          <img className='hero-img' src={Time} alt="clocks" />
        </div>
      </div>
    </section>
  )
}