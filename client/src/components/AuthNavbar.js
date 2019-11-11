import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./AuthNavbar.css";
import { Button, NavbarBrand, Navbar, NavItem, Nav } from "reactstrap";
import logo from './images/T4T1-02.png';

class AuthNavbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      localStorage.clear();
      this.props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    // console.log("the props", this.props);
    return (
      <Navbar className="navbar-absolute navbar-transparent" expand="lg">
        <NavbarBrand to="/" tag={Link} id="navbar-brand">
          <img className="logo" src={logo} alt="Time for Teachers logo" />
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
export default withRouter(AuthNavbar);
