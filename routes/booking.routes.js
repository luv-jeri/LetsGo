const express = require('express');
const controller = require('../controller/booking.controller');
const authController = require('../controller/authorization.controller');
const route = express.Router();

route.use(authController.authenticate);

route.route('/:id').post(controller.createBooking);
module.exports = route;
