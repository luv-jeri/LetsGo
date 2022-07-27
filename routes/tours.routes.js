const express = require('express');
const controller = require('../controller/tours.controller');
const authController = require('../controller/authorization.controller');
const _Error = require('../utils/_Error');
const { restrictTo } = require('../function/restrictTo');
const tourRoute = express.Router();

tourRoute.use(authController.authenticate);

tourRoute
  .route('/')
  .post(restrictTo(['organizer']), controller.addTour)
  .get(controller.getTours);

tourRoute
  .route('/:id')
  .get(authController.authenticate, controller.getTourById)
  .patch(controller.updateTour);

module.exports = tourRoute;
