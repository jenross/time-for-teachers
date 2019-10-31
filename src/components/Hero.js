import React from 'react';
import Workers from './images/busy-time-workers.png'

export default function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-body">
        <div>
          <img src={Workers} alt="busy workers with giant clock" />
        </div>
      </div>
    </section>
  )
}