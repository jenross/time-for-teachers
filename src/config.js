module.exports = {
    cognito: {
        region: process.env.REACT_APP_REGION, 
        user_pool_id: process.env.REACT_APP_USER_POOL_ID,
        app_client_id: process.env.REACT_APP_APP_CLIENT_ID
    }
};

