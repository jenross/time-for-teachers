import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import config from "./config.js";
// import { Router, Route, Switch, Redirect } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
import "assets/demo/nucleo-icons-page-styles.css";

// import AdminLayout from "layouts/Admin.jsx";
// import AuthLayout from "layouts/Auth.jsx";
import * as serviceWorker from './serviceWorker';


Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.region,
      userPoolId: config.cognito.user_pool_id,
      userPoolWebClientId: config.cognito.app_client_id
    }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
