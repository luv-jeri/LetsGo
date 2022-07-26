const express = require('express');
const controller = require('../controller/tours.controller');
const authController = require('../controller/authorization.controller');
const tourRoute = express.Router();

tourRoute.use(authController.authenticate);

const restrict = (roles) => {
  return async (req, res, next) => {
    if (roles.include(req.user.role)) {
      next();
    } else {
      next(new Error('You are not authorized to perform this action'));
    }
  };
};

tourRoute.route('/').post(controller.addTour).get(controller.getTours);

tourRoute
  .route('/:id')
  .get(authController.authenticate, controller.getTourById)
  .patch(controller.updateTour);

module.exports = tourRoute;
