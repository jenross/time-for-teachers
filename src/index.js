import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import config from "./config.js";
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
