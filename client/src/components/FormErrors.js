import React from 'react';

function FormErrors(props) {
    if (
      props.formerrors &&
      (props.formerrors.blankfield || props.formerrors.passwordmatch)
    ) {
      return (
        <div className="is-danger">
          <div>
            {props.formerrors.passwordmatch
              ? "Password value does not match confirm password value"
              : ""}
          </div>
          <div className="is-danger">
            {props.formerrors.blankfield ? "All fields are required" : ""}
          </div>
        </div>
      );
    } else if (props.apierrors) {
      return (
        <div className="is-danger">
          <div>{props.apierrors}</div>
        </div>
      );
    } else if (props.formerrors && props.formerrors.cognito) {
      return (
        <div className="is-danger">
          <div>
            {props.formerrors.cognito.message}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  
export default FormErrors;