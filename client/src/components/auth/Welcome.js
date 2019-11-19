import React from 'react';
import './forms.css'

export default function Welcome() {
  return (
    <section className="section auth form-page">
      <div className="form-container">
        <h1 className="form-header">Welcome!</h1>
        <p className="directions">You have successfully registered a new account.</p>
        <p className="directions">We've sent you an email. Please enter the code to verify your account.</p>
      </div>
    </section>
  )
}