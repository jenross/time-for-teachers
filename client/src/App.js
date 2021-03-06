import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from "react-router-dom";
import "./App.css";
import AuthNavbar from "./components/AuthNavbar";
import Home from "./components/Home";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Reports from './components/Reports';
import { Auth } from "aws-amplify";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
import "assets/demo/nucleo-icons-page-styles.css";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  };

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    localStorage.setItem("authenticated", true);
  };

  setUser = user => {
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      // const session = await Auth.currentSession();
      //true or false here?
      const user = await Auth.currentAuthenticatedUser();
      this.setAuthStatus(true);
      this.setUser(user);
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    return (
      <div className="App">
        <Router>
          <AuthNavbar auth={authProps} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/login"
              render={props => <LogIn {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/forgotpassword"
              render={props => <ForgotPassword {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/forgotpasswordverification"
              render={props => (
                <ForgotPasswordVerification {...props} auth={authProps} />
              )}
            />
            <Route
              exact
              path="/changepassword"
              render={props => <ChangePassword {...props} auth={authProps} />}
            />
            <Route
              exact
              path="/changepasswordconfirmation"
              render={props => (
                <ChangePasswordConfirm {...props} auth={authProps} />
              )}
            />
            <Route
              exact
              path="/welcome"
              render={props => <Welcome {...props} auth={authProps} />}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} user={this.state.user} />
            <PrivateRoute exact path="/reports" component={Reports} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
