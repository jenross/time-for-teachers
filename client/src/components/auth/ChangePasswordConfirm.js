import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./forms.css";

class ChangePasswordConfirmation extends Component {
  render() {
    if (localStorage.getItem("authenticated")) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <section className="section auth">
        <div className="form-container">
          <h1 className="form-header">Change Password</h1>
          <p className="directions">
            Your password has been successfully updated!
          </p>
        </div>
      </section>
    );
  }
}

export default ChangePasswordConfirmation;
