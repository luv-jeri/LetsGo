const express = require('express');
const controller = require('../controller/tours.controller');
const authController = require('../controller/authorization.controller');

const tourRoute = express.Router();

// tourRoute.use(authController.authenticate);

tourRoute.route('/').post(controller.addTour).get(controller.getTours);

tourRoute
  .route('/:id')
  .get(authController.authenticate, controller.getTourById)
  .patch(controller.updateTour);

module.exports = tourRoute;
