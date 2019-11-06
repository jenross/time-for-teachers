import React from "react";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
// import './Navbar.css';

class AuthNavbar extends React.Component {
  // state = {
  //   isOpen: false
  // };
  // toggle = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // };
  // verifies if routeName is the one active (in browser input)
  // activeRoute = routeName => {
  //   return window.location.href.indexOf(routeName) > -1 ? "active" : "";
  // };
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
        {/* <div className="logo">
          <a className="navbar-link" href="/"> */}
            {/* <img src={} width="112" height="28" alt="Time for Teachers logo" /> */}
          {/* </a>
        </div> */}
          <a href="/" className="navbar-start">
            Home
          </a>
          
    
          <div className="navbar-buttons">
            <div>
                {this.props.auth.isAuthenticated && this.props.auth.user && (
                  <a href="#" className="navbar-hello">
                    Hello, {this.props.auth.user.username}!
                  </a>
                )}
            </div>
            {!this.props.auth.isAuthenticated && (
              <div>
                <a href="/register" className="navbar-link">
                  Register
                </a>
                <a href="/login" className="navbar-link">
                  Log in
                </a>
              </div>
            )}
            {this.props.auth.isAuthenticated && (
              <a href="/" onClick={this.handleLogOut} className="navbar-link">
                Log out
              </a>
            )}
          </div>
      </nav>
      
      
  );

    
  }
}
export default AuthNavbar;