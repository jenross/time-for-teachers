import React, { Component } from "react";
import FormErrors from "../FormErrors";
import { Redirect } from "react-router-dom";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import "./forms.css";
// import API from "../utility/API";
// import email from '../images/email-84.svg';
// import password from '../images/lock-open.svg';

// reactstrap components
import {
  // Button,
  Card
  // CardBody,
  // CardFooter,
  // CardTitle,
  // Label,
  // FormGroup,
  // Form,
  // Input,
  // InputGroupAddon,
  // InputGroupText,
  // InputGroup,
  // Container,
  // Row,
  // Col
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
          {/* <Row>
          <Col className="mx-auto" md="6" lg="4">
                <Card className="card-signup">
                  <CardBody>
                    <CardTitle className="text-center form-title" tag="h4">
                      Sign In
                    </CardTitle>
                    <FormErrors formerrors={this.state.errors} />
                    <Form action="" className="form" method="" onSubmit={this.handleSubmit}>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="input-section">
                            <img className="form-icon" src={email} alt="email icon" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                        id="username"
                        aria-describedby="usernameHelp"
                        autoComplete="email"
                        placeholder="Email or Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.onInputChange}
                        ></Input>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon className="input-prepend-section" addonType="prepend">
                          <InputGroupText className="input-section">
                            <img className="form-icon" src={password} alt="password icon" />
                          </InputGroupText>
                        
                        </InputGroupAddon>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Password"
                          type="text"
                          value={this.state.password}
                          onChange={this.onInputChange}
                        ></Input>
                      </InputGroup>
                      <div className="form-bottom">
                        <p className="control">
                          <a className="forgot-link" href="/forgotpassword">
                            Forgot password?
                          </a>
                        </p>
                      </div>
                      <CardFooter className="text-center">
                        <Button
                          className="btn-round"
                          href="/dashboard"
                          onClick={e => e.preventDefault()}
                          size="lg"
                          // onSubmit={this.handleSubmit}
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
          </Row> */}
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
