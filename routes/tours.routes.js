const express = require('express');
const controller = require('../controller/tours.controller');

const tourRoute = express.Router();

tourRoute.route('/').post(controller.addTour).get(controller.getTours);

tourRoute.route('/:id').get(controller.getTourById).patch(controller.updateTour);

module.exports = tourRoute;
