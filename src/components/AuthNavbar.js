import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import './AuthNavbar.css';
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav
} from "reactstrap";



export default class AuthNavbar extends Component  {
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
      <Navbar className="navbar-absolute navbar-transparent" expand="lg">
        <NavbarBrand to="/" tag={Link} id="navbar-brand">
          Time for Teachers
        </NavbarBrand>
        <Nav className="ml-auto" id="ceva" navbar>
              <NavItem>
                {!this.props.auth.isAuthenticated && (
                    <Button
                      className="nav-link"
                      id="register-btn"
                      color="primary"
                      href="/register"
                    >
                      
                      <p>Register</p>
                      
                    </Button>
                  )}
                </NavItem>
                
                
                <NavItem>
                  {!this.props.auth.isAuthenticated && (
                    <Button
                      className="nav-link"
                      id="login-btn"
                      color="neutral"
                      href="/login"
                    >
                      
                      <p>Sign In</p>
                      
                    </Button>
                  )}
                </NavItem>
                
          
       
            
              <NavItem>
                {this.props.auth.isAuthenticated && (
                    <Button
                      className="nav-link"
                      id="logout-btn"
                      color="neutral"
                      href="/"
                      onClick={this.handleLogOut}
                    >
                      <p>Log Out</p>
                      
                    </Button>
                )}
              </NavItem>
          
       
        </Nav>

      </Navbar>
      
    );
  }
}
// export default AuthNavbar;