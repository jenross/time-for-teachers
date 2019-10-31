import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    }catch(error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          <a className="navbar-link" href="/">
            {/* <img src={} width="112" height="28" alt="Time for Teachers logo" /> */}
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-link">
              Home
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-link">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="navbar-buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="submit-btn">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="submit-btn">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="submit-btn">
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}