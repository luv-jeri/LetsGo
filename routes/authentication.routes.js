const express = require('express');
const controller = require('../controller/authentication.controller');

const authRoute = express.Router();

authRoute.route('/sign_up').post(controller.singUp);
authRoute.route('/sign_in').post(controller.login);

module.exports = authRoute;
