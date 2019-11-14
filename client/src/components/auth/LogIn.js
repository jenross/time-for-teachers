import React, { Component } from "react";
import FormErrors from "../FormErrors";
import { Redirect } from "react-router-dom";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import "./forms.css";
import API from "../utility/API";
import email from '../images/email-84.svg';
import password from '../images/lock-open.svg';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  //? ========================== //
  // checkForUserDataDoc = () => {
  //   API.findDocument(localStorage.getItem("email")).then(res =>
  //     console.log(res.data)
  //   );
  // };
  //? ========================== //

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log(user);
      localStorage.setItem("email", user.attributes.email);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      this.props.history.push("/dashboard");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    if (localStorage.getItem("authenticated")) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <section className="section auth form-page">
          <div className="form-container">
          <Card className="card-signup">
            <h1 className="form-header">Sign In</h1>
            <FormErrors formerrors={this.state.errors} />

            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    id="username"
                    aria-describedby="usernameHelp"
                    placeholder="Enter username or email"
                    value={this.state.username}
                    onChange={this.onInputChange}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="form-bottom">
                <p className="control">
                  <a className="forgot-link" href="/forgotpassword">
                    Forgot password?
                  </a>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="submit-btn is-success" href="/dashboard">
                    Get started
                  </button>
                </p>
              </div>
            </form>
            </Card>
          </div>
        </section>
      </div>
    );
  }
}

export default LogIn;
