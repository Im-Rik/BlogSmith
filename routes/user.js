const express = require('express');
const router = express.Router();
const {renderSignupPage, handleUserSignUp, renderLogInPage, handleUserAuthentication, handleUserLogout} = require('../controller/users');


router
    .route('/signup')
    .get(renderSignupPage)
    .post(handleUserSignUp) 


router
    .route('/login')
    .get(renderLogInPage)
    .post(handleUserAuthentication)

router
    .get('/logout', handleUserLogout);

module.exports = router;
