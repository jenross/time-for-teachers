import React from "react";
import { Link } from "react-router-dom";
// import { Auth } from 'aws-amplify';
import './Navbar.css';
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav
} from "reactstrap";



class AuthNavbar extends React.Component {
//   // state = {
//   //   isOpen: false
//   // };
//   // toggle = () => {
//   //   this.setState({
//   //     isOpen: !this.state.isOpen
//   //   });
//   // };
//   // verifies if routeName is the one active (in browser input)
//   // activeRoute = routeName => {
//   //   return window.location.href.indexOf(routeName) > -1 ? "active" : "";
//   // };
  // handleLogOut = async event => {
  //   event.preventDefault();
  //   try {
  //     Auth.signOut();
  //     this.props.auth.setAuthStatus(false);
  //     this.props.auth.setUser(null);
  //   }catch(error) {
  //     console.log(error.message);
  //   }
  // }
  render() {
    return (
      <Navbar className="navbar-absolute navbar-transparent" expand="lg">
 
        {/* <div className="navbar-translate"> */}
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            Time for Teachers
          </NavbarBrand>
          {/* <button
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
          
            }}
           
            className="navbar-toggler"
          >
            <span className="navbar-toggler-bar top-bar"></span>
            <span className="navbar-toggler-bar middle-bar"></span>
            <span className="navbar-toggler-bar bottom-bar"></span>
          </button> */}
        {/* </div> */}
          <Nav className="ml-auto" id="ceva" navbar>
           <NavItem>
              <Button
                className="nav-link"
                id="register-btn"
                color="primary"
                href="/register"
              >
                <p>Register</p>
              </Button>
            </NavItem>
            <NavItem>
              <Button
                className="nav-link"
                id="login-btn"
                color="neutral"
                href="/login"
              >
                <p>Sign In</p>
              </Button>
            </NavItem>
          </Nav>
  
    </Navbar>
      // <nav className="navbar" role="navigation">
        
      //     <a href="/" className="navbar-start">
      //       Home
      //     </a>
          
    
      //     <div className="navbar-buttons">
      //       <div>
      //           {this.props.auth.isAuthenticated && this.props.auth.user && (
      //             <a href="#" className="navbar-hello">
      //               Hello, {this.props.auth.user.username}!
      //             </a>
      //           )}
      //       </div>
      //       {!this.props.auth.isAuthenticated && (
      //         <div>
      //           <a href="/register" className="navbar-link">
      //             Register
      //           </a>
      //           <a href="/login" className="navbar-link">
      //             Log in
      //           </a>
      //         </div>
      //       )}
      //       {this.props.auth.isAuthenticated && (
      //         <a href="/" onClick={this.handleLogOut} className="navbar-link">
      //           Log out
      //         </a>
      //       )}
      //     </div>
      // </nav>
      
      
  );

    
  }
}
export default AuthNavbar;